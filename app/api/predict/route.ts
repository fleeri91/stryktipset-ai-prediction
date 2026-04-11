// app/api/predict/route.ts
import { NextRequest, NextResponse } from 'next/server'
import * as tf from '@tensorflow/tfjs-node'
import { TeamRoot } from '@/server/types/ESPN/Team'
import fs from 'fs/promises'
import path from 'path'

let modelCache: tf.LayersModel | null = null
let teamsCache: TeamRoot[] | null = null

// Ladda alla teams
async function loadAllTeams(): Promise<TeamRoot[]> {
  if (teamsCache) return teamsCache

  const dataDir = path.join(process.cwd(), 'data', 'teams')

  const files = [
    'premier_league.json',
    'championship.json',
    'league_one.json',
    'league_two.json',
  ]

  const allTeams: TeamRoot[] = []

  for (const file of files) {
    try {
      const filePath = path.join(dataDir, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const teams = JSON.parse(fileContent)
      allTeams.push(...(Array.isArray(teams) ? teams : [teams]))
    } catch (error) {
      console.error(`Kunde inte läsa ${file}:`, error)
    }
  }

  teamsCache = allTeams
  return allTeams
}

// Ladda modellen
async function loadModel(): Promise<tf.LayersModel> {
  if (modelCache) return modelCache

  const modelPath = `file://${path.join(process.cwd(), 'models', 'stryktips-model', 'model.json')}`

  try {
    modelCache = await tf.loadLayersModel(modelPath)
    return modelCache
  } catch (error) {
    throw new Error('Modellen är inte tränad än. Kör POST /api/train först.')
  }
}

// Extrahera features
function extractTeamFeatures(team: TeamRoot) {
  const totalRecord = team.record?.items?.find((item) => item.type === 'total')

  const wins = totalRecord?.stats.find((s) => s.name === 'wins')?.value || 0
  const losses = totalRecord?.stats.find((s) => s.name === 'losses')?.value || 0
  const ties = totalRecord?.stats.find((s) => s.name === 'ties')?.value || 0
  const gamesPlayed = wins + losses + ties || 1
  const goalsFor =
    totalRecord?.stats.find((s) => s.name === 'pointsFor')?.value || 0
  const goalsAgainst =
    totalRecord?.stats.find((s) => s.name === 'pointsAgainst')?.value || 0

  const winPercentage = wins / gamesPlayed
  const strength = (wins + ties * 0.5) / gamesPlayed
  const form = 0.5 + (wins / gamesPlayed) * 0.5

  return {
    strength,
    form,
    goalsFor,
    goalsAgainst,
    winPercentage,
  }
}

function createMatchFeatures(homeTeam: TeamRoot, awayTeam: TeamRoot): number[] {
  const homeFeatures = extractTeamFeatures(homeTeam)
  const awayFeatures = extractTeamFeatures(awayTeam)

  return [
    homeFeatures.strength,
    awayFeatures.strength,
    homeFeatures.form,
    awayFeatures.form,
    homeFeatures.goalsFor / 100,
    homeFeatures.goalsAgainst / 100,
    awayFeatures.goalsFor / 100,
    awayFeatures.goalsAgainst / 100,
    homeFeatures.winPercentage,
    awayFeatures.winPercentage,
  ]
}

// GET /api/predict - Lista alla teams
export async function GET(request: NextRequest) {
  try {
    const teams = await loadAllTeams()

    return NextResponse.json({
      teams: teams.map((t) => ({
        id: t.id,
        name: t.displayName,
        abbreviation: t.abbreviation,
        league: t.leagueAbbrev || 'Unknown',
        record: t.standingSummary,
      })),
      count: teams.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Kunde inte ladda teams', details: String(error) },
      { status: 500 }
    )
  }
}

// POST /api/predict - Förutsäg en match
export async function POST(request: NextRequest) {
  try {
    const { homeTeamId, awayTeamId } = await request.json()

    if (!homeTeamId || !awayTeamId) {
      return NextResponse.json(
        { error: 'homeTeamId och awayTeamId krävs' },
        { status: 400 }
      )
    }

    // Ladda modell och teams
    const model = await loadModel()
    const teams = await loadAllTeams()

    // Hitta teams
    const homeTeam = teams.find((t) => t.id === homeTeamId)
    const awayTeam = teams.find((t) => t.id === awayTeamId)

    if (!homeTeam || !awayTeam) {
      return NextResponse.json(
        { error: 'Ett eller båda lagen hittades inte' },
        { status: 404 }
      )
    }

    // Skapa features
    const features = createMatchFeatures(homeTeam, awayTeam)
    const input = tf.tensor2d([features])

    // Förutsäg
    const prediction = model.predict(input) as tf.Tensor
    const probabilities = await prediction.data()

    // Rensa
    input.dispose()
    prediction.dispose()

    const home = probabilities[0]
    const draw = probabilities[1]
    const away = probabilities[2]

    const maxProb = Math.max(home, draw, away)
    const predictedResult =
      home === maxProb ? '1' : draw === maxProb ? 'X' : '2'

    return NextResponse.json({
      homeTeam: {
        id: homeTeam.id,
        name: homeTeam.displayName,
        abbreviation: homeTeam.abbreviation,
      },
      awayTeam: {
        id: awayTeam.id,
        name: awayTeam.displayName,
        abbreviation: awayTeam.abbreviation,
      },
      prediction: predictedResult,
      probabilities: {
        home: Math.round(home * 1000) / 10,
        draw: Math.round(draw * 1000) / 10,
        away: Math.round(away * 1000) / 10,
      },
      confidence: Math.round(maxProb * 1000) / 10,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Kunde inte göra förutsägelse', details: String(error) },
      { status: 500 }
    )
  }
}

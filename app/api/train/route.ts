// app/api/train/route.ts
import { NextRequest, NextResponse } from 'next/server'
import * as tf from '@tensorflow/tfjs-node' // Viktigt: använd tfjs-node för server-side
import { TeamRoot } from '@/server/types/ESPN/Team'
import fs from 'fs/promises'
import path from 'path'

interface MatchFeatures {
  homeStrength: number
  awayStrength: number
  homeForm: number
  awayForm: number
  homeGoalsFor: number
  homeGoalsAgainst: number
  awayGoalsFor: number
  awayGoalsAgainst: number
  homeWinPercentage: number
  awayWinPercentage: number
}

// Läs alla teams från JSON filer
async function loadAllTeams(): Promise<TeamRoot[]> {
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

  return allTeams
}

// Beräkna lagstyrka
function calculateTeamStrength(team: TeamRoot): number {
  if (!team.record?.items?.length) return 0.5

  const totalRecord = team.record.items.find((item) => item.type === 'total')
  if (!totalRecord) return 0.5

  const wins = totalRecord.stats.find((s) => s.name === 'wins')?.value || 0
  const losses = totalRecord.stats.find((s) => s.name === 'losses')?.value || 0
  const ties = totalRecord.stats.find((s) => s.name === 'ties')?.value || 0
  const gamesPlayed = wins + losses + ties

  if (gamesPlayed === 0) return 0.5

  return (wins + ties * 0.5) / gamesPlayed
}

// Extrahera features från team
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

  return {
    strength: calculateTeamStrength(team),
    form: 0.5 + (wins / gamesPlayed) * 0.5, // Enkel form beräkning
    goalsFor,
    goalsAgainst,
    winPercentage: wins / gamesPlayed,
    gamesPlayed,
  }
}

// Skapa match features
function createMatchFeatures(homeTeam: TeamRoot, awayTeam: TeamRoot): number[] {
  const homeFeatures = extractTeamFeatures(homeTeam)
  const awayFeatures = extractTeamFeatures(awayTeam)

  return [
    homeFeatures.strength,
    awayFeatures.strength,
    homeFeatures.form,
    awayFeatures.form,
    homeFeatures.goalsFor / 100, // Normalisera
    homeFeatures.goalsAgainst / 100,
    awayFeatures.goalsFor / 100,
    awayFeatures.goalsAgainst / 100,
    homeFeatures.winPercentage,
    awayFeatures.winPercentage,
  ]
}

// Generera träningsdata
function generateTrainingData(teams: TeamRoot[]) {
  const matches: Array<{
    features: number[]
    label: number[]
  }> = []

  // Skapa matchpar
  for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams.length; j++) {
      if (i === j) continue

      const home = teams[i]
      const away = teams[j]

      const homeStrength = calculateTeamStrength(home)
      const awayStrength = calculateTeamStrength(away)

      // Simulera resultat baserat på styrka
      const diff = homeStrength - awayStrength + 0.1 // Hemmaplansfördel

      let label: number[]
      const random = Math.random()

      if (diff > 0.2) {
        // Stark hemmalag
        label =
          random > 0.15 ? [1, 0, 0] : random > 0.05 ? [0, 1, 0] : [0, 0, 1]
      } else if (diff < -0.1) {
        // Stark bortalag
        label =
          random > 0.15 ? [0, 0, 1] : random > 0.05 ? [0, 1, 0] : [1, 0, 0]
      } else {
        // Jämna lag
        label = random > 0.6 ? [0, 1, 0] : random > 0.3 ? [1, 0, 0] : [0, 0, 1]
      }

      matches.push({
        features: createMatchFeatures(home, away),
        label,
      })

      if (matches.length >= 500) break // Begränsa träningsdata
    }
    if (matches.length >= 500) break
  }

  return matches
}

// POST /api/train - Träna modellen
export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Startar träning av modellen...')

    // 1. Ladda alla teams
    const teams = await loadAllTeams()
    console.log(`✅ Laddade ${teams.length} lag`)

    if (teams.length < 10) {
      return NextResponse.json(
        { error: 'Behöver minst 10 lag för träning' },
        { status: 400 }
      )
    }

    // 2. Generera träningsdata
    const trainingData = generateTrainingData(teams)
    console.log(`✅ Genererade ${trainingData.length} träningsexempel`)

    const features = trainingData.map((d) => d.features)
    const labels = trainingData.map((d) => d.label)

    // 3. Bygg modellen
    const model = tf.sequential()

    model.add(
      tf.layers.dense({
        inputShape: [10],
        units: 64,
        activation: 'relu',
        kernelInitializer: 'heNormal',
      })
    )

    model.add(tf.layers.dropout({ rate: 0.3 }))

    model.add(
      tf.layers.dense({
        units: 32,
        activation: 'relu',
      })
    )

    model.add(tf.layers.dropout({ rate: 0.2 }))

    model.add(
      tf.layers.dense({
        units: 16,
        activation: 'relu',
      })
    )

    model.add(
      tf.layers.dense({
        units: 3,
        activation: 'softmax',
      })
    )

    model.compile({
      optimizer: tf.train.adam(0.001),
      loss: 'categoricalCrossentropy',
      metrics: ['accuracy'],
    })

    console.log('✅ Modell byggd')

    // 4. Träna modellen
    const xs = tf.tensor2d(features)
    const ys = tf.tensor2d(labels)

    const history = await model.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      verbose: 0,
    })

    console.log('✅ Träning klar')

    // 5. Spara modellen
    const modelDir = path.join(process.cwd(), 'models')
    await fs.mkdir(modelDir, { recursive: true })

    const modelPath = `file://${path.join(modelDir, 'stryktips-model')}`
    await model.save(modelPath)

    console.log('✅ Modell sparad')

    // Rensa tensorer
    xs.dispose()
    ys.dispose()
    model.dispose()

    const finalLoss = history.history.loss[history.history.loss.length - 1]
    const finalAccuracy = history.history.acc[history.history.acc.length - 1]

    return NextResponse.json({
      success: true,
      message: 'Modellen är tränad och sparad',
      stats: {
        trainingExamples: trainingData.length,
        epochs: 50,
        finalLoss: finalLoss,
        finalAccuracy: finalAccuracy,
        teamsLoaded: teams.length,
      },
    })
  } catch (error) {
    console.error('❌ Fel vid träning:', error)
    return NextResponse.json(
      { error: 'Kunde inte träna modellen', details: String(error) },
      { status: 500 }
    )
  }
}

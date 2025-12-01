import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

import { EspnApi } from '@/server/api/espn-client'
import {
  PREMIER_LEAGUE_TEAMS,
  CHAMPIONSHIP_TEAMS,
  LEAGUE_ONE_TEAMS,
  LEAGUE_TWO_TEAMS,
} from '@/server/constants/espn/teams'
import { LeagueId } from '@/server/types/ESPN/LeagueId'
import { Team } from '@/server/constants/espn/types/Team'

async function fetchAndCache(
  leagueId: LeagueId,
  teams: Team[],
  fileName: string
) {
  const results = []

  for (const team of teams) {
    console.log('Fetching', team.name)
    const info = await EspnApi.fetchTeamInfoById(leagueId, team.id)

    results.push({
      id: team.id,
      name: team.name,
      raw: info,
    })
  }

  const outputPath = path.join(process.cwd(), 'data', 'teams', fileName)
  await fs.mkdir(path.dirname(outputPath), { recursive: true }) // skapar mappen om den saknas
  await fs.writeFile(outputPath, JSON.stringify(results, null, 2))

  console.log(`Saved ${fileName} with ${results.length} teams`)
}

export async function GET() {
  await fetchAndCache(
    LeagueId.PREMIER_LEAGUE,
    PREMIER_LEAGUE_TEAMS,
    'premier_league.json'
  )
  await fetchAndCache(
    LeagueId.CHAMPIONSHIP,
    CHAMPIONSHIP_TEAMS,
    'championship.json'
  )
  await fetchAndCache(LeagueId.LEAGUE_ONE, LEAGUE_ONE_TEAMS, 'league_one.json')
  await fetchAndCache(LeagueId.LEAGUE_TWO, LEAGUE_TWO_TEAMS, 'league_two.json')

  return NextResponse.json({ status: 'All leagues cached!' })
}

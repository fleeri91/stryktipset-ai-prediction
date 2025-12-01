import axios from 'axios'
import { TeamRoot } from '@/server/types/ESPN/Team'
import { LeagueTeamsRoot } from '@/server/types/ESPN/LeagueTeams'
import { LeagueTableRoot } from '@/server/types/ESPN/LeagueTable'

export const espnApiClient = axios.create({
  baseURL: process.env.ESPN_API_URL,
  timeout: 10000,
})

espnApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('ESPN API Error:', error.response?.data || error.message)
    throw error
  }
)

export const EspnApi = {
  fetchTeamInfoById: async (
    leagueId: string,
    teamId: number
  ): Promise<TeamRoot> => {
    const res = await espnApiClient.get<TeamRoot>(`${leagueId}/teams/${teamId}`)
    return res.data
  },
  fetchTeamsByLeagueId: async (leagueId: string): Promise<LeagueTeamsRoot> => {
    const res = await espnApiClient.get<LeagueTeamsRoot>(`${leagueId}/teams`)
    return res.data
  },
  fetchTableByLeagueId: async (leagueId: string): Promise<LeagueTableRoot> => {
    const res = await espnApiClient.get<LeagueTableRoot>(
      `${leagueId}/scoreboard`
    )
    return res.data
  },
}

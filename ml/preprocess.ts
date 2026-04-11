import { Event } from '@/server/types/SvenskaSpel/Event'

export interface MatchFeatures {
  team1Index: number
  team2Index: number
  homeAdvantage: number
}

export function createTeamMapping(events: Event[]): Record<string, number> {
  const mapping: Record<string, number> = {}
  let idx = 0
  events.forEach((event) => {
    event.participants.forEach((p) => {
      if (!(p.name in mapping)) {
        mapping[p.name] = idx++
      }
    })
  })
  return mapping
}

export function eventToFeatures(
  event: Event,
  teamMapping: Record<string, number>
): MatchFeatures {
  const [team1, team2] = event.participants // anta att första är hemma
  return {
    team1Index: teamMapping[team1.name],
    team2Index: teamMapping[team2.name],
    homeAdvantage: 1, // sätt 1 om första är hemma
  }
}

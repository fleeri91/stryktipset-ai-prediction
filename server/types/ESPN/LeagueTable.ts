export interface LeagueTableRoot {
  leagues: League[]
  season: Season2
  day: Day
  events: Event[]
  provider: Provider2
}

export interface League {
  id: string
  uid: string
  name: string
  abbreviation: string
  midsizeName: string
  slug: string
  season: Season
  logos: Logo[]
  calendarType: string
  calendarIsWhitelist: boolean
  calendarStartDate: string
  calendarEndDate: string
  calendar: string[]
}

export interface Season {
  year: number
  startDate: string
  endDate: string
  displayName: string
  type: Type
}

export interface Type {
  id: string
  type: number
  name: string
  abbreviation: string
}

export interface Logo {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}

export interface Season2 {
  type: number
  year: number
}

export interface Day {
  date: string
}

export interface Event {
  id: string
  uid: string
  date: string
  name: string
  shortName: string
  season: Season3
  competitions: Competition[]
  status: Status2
  venue: Venue3
  links: Link13[]
}

export interface Season3 {
  year: number
  type: number
  slug: string
}

export interface Competition {
  id: string
  uid: string
  date: string
  startDate: string
  attendance: number
  timeValid: boolean
  recent: boolean
  status: Status
  venue: Venue
  tickets: Ticket[]
  format: Format
  notes: string[]
  geoBroadcasts: string[]
  broadcasts: string[]
  broadcast: string
  competitors: Competitor[]
  details: string[]
  odds: Odd[]
  wasSuspended: boolean
  playByPlayAvailable: boolean
  playByPlayAthletes: boolean
}

export interface Status {
  clock: number
  displayClock: string
  type: Type2
}

export interface Type2 {
  id: string
  name: string
  state: string
  completed: boolean
  description: string
  detail: string
  shortDetail: string
}

export interface Venue {
  id: string
  fullName: string
  address: Address
}

export interface Address {
  city: string
  country: string
}

export interface Ticket {
  summary: string
  numberAvailable: number
  links: Link[]
}

export interface Link {
  href: string
}

export interface Format {
  regulation: Regulation
}

export interface Regulation {
  periods: number
}

export interface Competitor {
  id: string
  uid: string
  type: string
  order: number
  homeAway: string
  winner: boolean
  form: string
  score: string
  records: Record[]
  team: Team
  statistics: string[]
  leaders: Leader[]
}

export interface Record {
  name: string
  type: string
  summary: string
  abbreviation: string
}

export interface Team {
  id: string
  uid: string
  abbreviation: string
  displayName: string
  shortDisplayName: string
  name: string
  location: string
  color: string
  alternateColor: string
  isActive: boolean
  logo: string
  links: Link2[]
  venue: Venue2
}

export interface Link2 {
  rel: string[]
  href: string
  text: string
  isExternal: boolean
  isPremium: boolean
  isHidden: boolean
}

export interface Venue2 {
  id: string
}

export interface Leader {
  name: string
  displayName: string
  shortDisplayName: string
  abbreviation: string
  leaders: Leader2[]
}

export interface Leader2 {
  displayValue: string
  value: number
  athlete: Athlete
  team: Team3
}

export interface Athlete {
  id: string
  displayName: string
  shortName: string
  fullName: string
  jersey: string
  active: boolean
  team: Team2
  links: Link3[]
  position: Position
}

export interface Team2 {
  id: string
}

export interface Link3 {
  rel: string[]
  href: string
  isHidden: boolean
}

export interface Position {
  abbreviation: string
}

export interface Team3 {
  id: string
}

export interface Odd {
  overUnder: number
  link: Link4
  provider: Provider
  drawOdds: DrawOdds
  total: Total
  pointSpread: PointSpread
  moneyline: Moneyline
  details: string
}

export interface Link4 {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
  isHidden: boolean
}

export interface Provider {
  id: string
  name: string
  priority: number
}

export interface DrawOdds {
  moneyLine: number
  link: Link5
}

export interface Link5 {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
  isHidden: boolean
}

export interface Total {
  displayName: string
  shortDisplayName: string
  over: Over
  under: Under
}

export interface Over {
  open: Open
  close: Close
}

export interface Open {
  line: string
  odds: string
}

export interface Close {
  line: string
  odds: string
  link: Link6
}

export interface Link6 {
  rel: string[]
  href: string
  tracking: Tracking
}

export interface Tracking {
  campaign: string
  tags: Tags
}

export interface Tags {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
  betDetails: string
}

export interface Under {
  open: Open2
  close: Close2
}

export interface Open2 {
  line: string
  odds: string
}

export interface Close2 {
  line: string
  odds: string
  link: Link7
}

export interface Link7 {
  rel: string[]
  href: string
  tracking: Tracking2
}

export interface Tracking2 {
  campaign: string
  tags: Tags2
}

export interface Tags2 {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
  betDetails: string
}

export interface PointSpread {
  displayName: string
  shortDisplayName: string
  home: Home
  away: Away
}

export interface Home {
  open: Open3
  close: Close3
}

export interface Open3 {
  line: string
  odds: string
}

export interface Close3 {
  line: string
  odds: string
  link: Link8
}

export interface Link8 {
  rel: string[]
  href: string
  tracking: Tracking3
}

export interface Tracking3 {
  campaign: string
  tags: Tags3
}

export interface Tags3 {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
  betDetails: string
}

export interface Away {
  open: Open4
  close: Close4
}

export interface Open4 {
  line: string
  odds: string
}

export interface Close4 {
  line: string
  odds: string
  link: Link9
}

export interface Link9 {
  rel: string[]
  href: string
  tracking: Tracking4
}

export interface Tracking4 {
  campaign: string
  tags: Tags4
}

export interface Tags4 {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
  betDetails: string
}

export interface Moneyline {
  displayName: string
  shortDisplayName: string
  home: Home2
  away: Away2
  draw: Draw
}

export interface Home2 {
  open: Open5
  close: Close5
}

export interface Open5 {
  odds: string
}

export interface Close5 {
  odds: string
  link: Link10
}

export interface Link10 {
  rel: string[]
  href: string
  tracking: Tracking5
}

export interface Tracking5 {
  campaign: string
  tags: Tags5
}

export interface Tags5 {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
}

export interface Away2 {
  open: Open6
  close: Close6
}

export interface Open6 {
  odds: string
}

export interface Close6 {
  odds: string
  link: Link11
}

export interface Link11 {
  rel: string[]
  href: string
  tracking: Tracking6
}

export interface Tracking6 {
  campaign: string
  tags: Tags6
}

export interface Tags6 {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
}

export interface Draw {
  open: Open7
  close: Close7
}

export interface Open7 {
  odds: string
}

export interface Close7 {
  odds: string
  link: Link12
}

export interface Link12 {
  rel: string[]
  href: string
  tracking: Tracking7
}

export interface Tracking7 {
  campaign: string
  tags: Tags7
}

export interface Tags7 {
  league: string
  sport: string
  gameId: number
  betSide: string
  betType: string
}

export interface Status2 {
  clock: number
  displayClock: string
  type: Type3
}

export interface Type3 {
  id: string
  name: string
  state: string
  completed: boolean
  description: string
  detail: string
  shortDetail: string
}

export interface Venue3 {
  displayName: string
}

export interface Link13 {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
  isHidden: boolean
}

export interface Provider2 {
  id: string
  name: string
  priority: number
}

export interface TeamRoot {
  id: string
  uid: string
  slug: string
  location: string
  name: string
  nickname: string
  abbreviation: string
  displayName: string
  shortDisplayName: string
  color: string
  alternateColor: string
  isActive: boolean
  logos: Logo[]
  record: Record
  groups: Groups
  links: Link[]
  defaultLeague: DefaultLeague
  leagueAbbrev: string
  nextEvent: NextEvent[]
  standingSummary: string
}

export interface Logo {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}

export interface Record {
  items: Item[]
}

export interface Item {
  description: string
  type: string
  summary: string
  stats: Stat[]
}

export interface Stat {
  name: string
  value: number
}

export interface Groups {
  id: string
}

export interface Link {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
}

export interface DefaultLeague {
  id: string
  alternateId: string
  name: string
  abbreviation: string
  shortName: string
  midsizeName: string
  slug: string
  season: Season
  links: Link2[]
  logos: Logo2[]
}

export interface Season {
  type: Type
}

export interface Type {
  hasStandings: boolean
}

export interface Link2 {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
}

export interface Logo2 {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}

export interface NextEvent {
  id: string
  date: string
  name: string
  shortName: string
  season: Season2
  seasonType: SeasonType
  timeValid: boolean
  competitions: Competition[]
  links: Link6[]
  league: League
}

export interface Season2 {
  year: number
  displayName: string
}

export interface SeasonType {
  id: string
  type: number
  name: string
  abbreviation: string
}

export interface Competition {
  id: string
  date: string
  attendance: number
  timeValid: boolean
  neutralSite: boolean
  boxscoreAvailable: boolean
  ticketsAvailable: boolean
  venue: Venue
  competitors: Competitor[]
  notes: string[]
  odds: Odd[]
  broadcasts: string[]
  tickets: Ticket[]
  status: Status
}

export interface Venue {
  fullName: string
  address: Address
}

export interface Address {
  city: string
  country: string
}

export interface Competitor {
  id: string
  type: string
  order: number
  homeAway: string
  winner: boolean
  team: Team2
}

export interface Team2 {
  id: string
  location: string
  nickname: string
  abbreviation: string
  displayName: string
  shortDisplayName: string
  logos: Logo3[]
  links: Link3[]
}

export interface Logo3 {
  href: string
  width: number
  height: number
  alt: string
  rel: string[]
  lastUpdated: string
}

export interface Link3 {
  rel: string[]
  href: string
  text: string
}

export interface Odd {
  awayTeamOdds: AwayTeamOdds
  homeTeamOdds: HomeTeamOdds
  links: Link4[]
}

export interface AwayTeamOdds {
  favorite?: boolean
  underdog?: boolean
  moneyLine?: number
  spreadOdds?: number
  open?: Open
  current?: Current
  team: Team3
  odds?: Odds
}

export interface Open {
  favorite: boolean
  pointSpread: PointSpread
  spread: Spread
  moneyLine: MoneyLine
}

export interface PointSpread {
  alternateDisplayValue: string
  american: string
}

export interface Spread {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
}

export interface MoneyLine {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
}

export interface Current {
  pointSpread: PointSpread2
  spread: Spread2
  moneyLine: MoneyLine2
}

export interface PointSpread2 {
  alternateDisplayValue: string
  american: string
}

export interface Spread2 {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
  outcome?: Outcome
}

export interface Outcome {
  type: string
}

export interface MoneyLine2 {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
  outcome?: Outcome2
}

export interface Outcome2 {
  type: string
}

export interface Team3 {
  id: string
  name: string
  abbreviation: string
}

export interface Odds {
  summary: string
  value: number
  handicap: number
}

export interface HomeTeamOdds {
  favorite?: boolean
  underdog?: boolean
  moneyLine?: number
  spreadOdds?: number
  open?: Open2
  current?: Current2
  team: Team4
  odds?: Odds2
}

export interface Open2 {
  favorite: boolean
  pointSpread: PointSpread3
  spread: Spread3
  moneyLine: MoneyLine3
}

export interface PointSpread3 {
  alternateDisplayValue: string
  american: string
  value?: number
  displayValue?: string
  decimal?: number
  fraction?: string
}

export interface Spread3 {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
}

export interface MoneyLine3 {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
}

export interface Current2 {
  pointSpread: PointSpread4
  spread: Spread4
  moneyLine: MoneyLine4
}

export interface PointSpread4 {
  alternateDisplayValue: string
  american: string
}

export interface Spread4 {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
  outcome?: Outcome3
}

export interface Outcome3 {
  type: string
}

export interface MoneyLine4 {
  value: number
  displayValue: string
  alternateDisplayValue: string
  decimal: number
  fraction: string
  american: string
  outcome?: Outcome4
}

export interface Outcome4 {
  type: string
}

export interface Team4 {
  id: string
  name: string
  abbreviation: string
}

export interface Odds2 {
  summary: string
  value: number
  handicap: number
}

export interface Link4 {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
}

export interface Ticket {
  id: string
  summary: string
  description: string
  maxPrice: number
  startingPrice: number
  numberAvailable: number
  totalPostings: number
  links: Link5[]
}

export interface Link5 {
  rel: string[]
  href: string
}

export interface Status {
  clock: number
  addedClock: number
  displayClock: string
  period: number
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

export interface Link6 {
  language: string
  rel: string[]
  href: string
  text: string
  shortText: string
  isExternal: boolean
  isPremium: boolean
}

export interface League {
  id: string
  alternateId: string
  name: string
  abbreviation: string
  shortName: string
  midsizeName: string
  slug: string
  isTournament: boolean
}

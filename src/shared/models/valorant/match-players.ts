export interface IPlayers {
  all_players: IMatchPlayer[];
  blue: IMatchPlayer[];
  red: IMatchPlayer[];
}

export interface IMatchPlayer {
  ability_casts: IAbilityCast;
  assets: IAsset;
  behavior: IBehavior;
  character: string;
  currenttier: number;
  currenttier_patched: string;
  damage_made: number;
  damage_received: number;
  economy: IEconomy;
  level: number;
  name: string;
  party_id: string;
  platform: IPlatform;
  player_card: string;
  player_title: string;
  puuid: string;
  session_playtime: ISessionPlaytime;
  stats: IStats;
  tag: string;
  team: string
}

export interface IAbilityCast {
  c_cast: number;
  e_cast: number;
  q_cast: number;
  x_cast: number;
}

export interface IAsset {
  agent: IMatchAgent;
  card: IMatchCard;
}

export interface IMatchAgent {
  bust: string;
  full: string;
  killfeed: string;
  small: string;
}

export interface IMatchCard {
  large: string;
  small: string;
  wide: string;
}

export interface IBehavior {
  afk_rounds: number;
  firendly_fire: IFriendlyFire;
  rounds_in_spawn: number;
}

export interface IFriendlyFire {
  incoming: number;
  outgoing: number;
}

export interface IEconomy {
  loadout_value: IEconomyAvg;
  spent: IEconomyAvg;
}

export interface IEconomyAvg {
  avarage: number;
  overall: number;
}

export interface IPlatform {
  type: string;
  os: IOS;
}

export interface IOS {
  name: string;
  version: string;
}

export interface ISessionPlaytime {
  milliseconds: number;
  minutes: number;
  seconds: number;
}

export interface IStats {
  assists: number;
  bodyshots: number;
  deaths: number;
  headshots: number;
  kills: number;
  legshots: number;
  score: number;
}

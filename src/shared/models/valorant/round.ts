import { IKill, IPlainLocation, IPlayerLocationOnKill } from "./kill";
import { IAbilityCast } from "./match-players";

export interface IRound {
  bomb_defused: boolean;
  bomb_planted: boolean;
  defuse_events: IDefuseEvents;
  end_type: string;
  plant_events: IPlantEvents;
  player_stats: IPlayerStats[];
  winning_team: string;
}

export interface IDefuseEvents {
  defuse_location: IPlainLocation;
  defuse_time_in_round: number;
  defused_by: IEventPlayer;
  player_locations_on_defuse: IDefusePlayerLocation[];
}

export interface IEventPlayer {
  display_name: string;
  puuid: string;
  team: string;
}

export interface IDefusePlayerLocation {
  location: IPlainLocation;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  view_radians: number;
}

export interface IPlantEvents {
  plant_location: IPlainLocation;
  plant_site: string;
  plant_time_in_round: number;
  planted_by: IEventPlayer;
  player_locations_on_plant: IEventPlayer[];
}

export interface IPlayerStats {
  ability_cast: IAbilityCast;
  bodyshots: number;
  damage: number;
  damage_events: IDamageEvent[];
  economy: IPlayerEconomy;
  headshots: number;
  kill_events: IKill[];
  kills: number;
  legshots: number;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  score: number;
  stayed_in_spawn: boolean;
  was_afk: boolean;
  was_penalized: boolean;
}

export interface IDamageEvent {
  bodyshots: number;
  damage: number;
  headshots: 0;
  legshots: 0;
  receiver_display_name: string;
  receiver_puuid: string;
  receiver_team: string;
}

export interface IPlayerEconomy {
  armor: IArmor;
  loadout_value: number;
  remaining: number;
  spent: number;
}

export interface IArmor {
  assets: IArmorAsset;
  id: string;
  name: string;
}

export interface IArmorAsset {
  display_icon: string;
}

export interface IKill {
  assistants: IAssistant[];
  damage_weapon_assets: IDamageWeaponAssets;
  damage_weapon_id: string;
  damage_weapon_name: string;
  kill_time_in_match: number;
  kill_time_in_round: number;
  killer_display_name: string;
  killer_puuid: string;
  killer_team: string;
  player_locations_on_kill: IPlayerLocationOnKill[];
  round?: number;
  secondary_fire_mode: boolean;
  victim_death_location: IPlainLocation;
  victim_display_name: string;
  victim_puuid: string;
  victim_team: string;
}

export interface IAssistant {
  assistant_display_name: string;
  assistant_puuid: string;
  assistant_team: string;
}

export interface IDamageWeaponAssets {
  display_icon: string;
  killfeed_icon: string;
}

export interface IPlayerLocationOnKill {
  location: IPlainLocation;
  player_display_name: string;
  player_puuid: string;
  player_team: string;
  view_radians: number;
}

export interface IPlainLocation {
  x: number;
  y: number;
}
import { IKill } from "./kill";
import { IPlayers } from "./match-players";
import { IMetadata } from "./metadata";
import { IRound } from "./round";
import { ITeams } from "./team";

export interface IMatch {
  is_available?: boolean;
  kills: IKill[];
  metadata: IMetadata;
  players: IPlayers;
  rounds: IRound[];
  teams: ITeams;
}

export interface IMatchResponse {
  status: number;
  data: IMatch[];
}
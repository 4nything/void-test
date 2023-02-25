import { IPlayer } from "./player";

export interface ILeaderboard {
  inmortal_1_threshold: number;
  inmortal_2_threshold: number;
  inmortal_3_threshold: number;
  last_update: number;
  next_update: number;
  players: IPlayer[];
  radiant_threshold: number;
  total_players: number;
}

export interface ILeaderboardResponse {
  status: number;
  data: ILeaderboard;
}
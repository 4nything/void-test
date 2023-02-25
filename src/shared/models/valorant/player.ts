export interface IPlayer {
  IsAnonymized: boolean;
  IsBanned: boolean;
  PlayerCardID: string;
  TitleID: string;
  competitiveTier: number;
  gameName: string;
  leaderboardRank: number;
  numberOfWins: number;
  puuid: string;
  rankedRating: number;
  tagLine: string;
}
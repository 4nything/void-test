export interface ITeams {
  blue: ITeam;
  red: ITeam;
}

export interface ITeam {
  has_won: boolean;
  rounds_lost: number;
  rounds_won: number;
}
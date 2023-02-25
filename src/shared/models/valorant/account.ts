export interface IAccount {
  puuid: string;
  region: string;
  account_level: number;
  name: string;
  tag: string;
  card: IAccountCard;
  last_update: string | number;
  last_update_raw: number;
}

export interface IAccountCard {
  small: string;
  large: string;
  wide: string;
  id: string;
}

export interface IAccountResponse {
  status: number;
  data: IAccount;
}
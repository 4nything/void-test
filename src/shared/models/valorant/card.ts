import { IMap } from "./map";
import { IMatch } from "./match";
import { IPlayer } from "./player";
import { ITier } from "./tier";

export type CardProps = {
  player: IPlayer;
  tiers?: ITier[];
  maps?: IMap[];
  match?:  IMatch;
  isMobile?: boolean;
  onClick?: (player?: IPlayer) => void;
  onBackdrop?: () => void;
};
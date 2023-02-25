import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";
import fontawesome from "@fortawesome/fontawesome";
import Image from "next/image";
import { CardProps } from "@/shared/models/valorant/card";

fontawesome.library.add(faStar);

export function Card({ player, tiers, onClick }: CardProps) {
  return (
    <div
      key={player.leaderboardRank}
      className="dashboard-row"
      onClick={() => (onClick ? onClick(player) : () => {})}
    >
      <div className="dashboard-row__rank">
        {tiers ? (
          <Image
            alt="Competitive Tier"
            src={
              tiers.find((t) => t.tier === player.competitiveTier)
                ?.largeIcon as string
            }
            width={64}
            height={64}
          ></Image>
        ) : (
          <></>
        )}
        <span>{player.leaderboardRank}</span>
        {player.leaderboardRank === 1 ? (
          <FontAwesomeIcon
            icon="star"
            width={16}
            color="yellow"
          ></FontAwesomeIcon>
        ) : (
          <></>
        )}
      </div>
      <div className="dashboard-row__name">
        <span className="dashboard-row__name__player-name">
          {player.IsAnonymized ? "Secret Agent" : player.gameName}
        </span>
        <span className="dashboard-row__name__tag">#{player.tagLine}</span>
      </div>
      <div className="dashboard-row__wins">
        <span>Wins: {player.numberOfWins}</span>
      </div>
    </div>
  );
}

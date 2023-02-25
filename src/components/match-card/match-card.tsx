import { CardProps } from "@/shared/models/valorant/card";
import Image from "next/image";
import { useEffect, useState } from "react";

type matchTeam = "blue" | "red";

export function MatchCard({ player, match, maps, isMobile }: CardProps) {
  const [result, setResult] = useState<"VICTORY" | "DEFEAT" | "OTHER">(
    "VICTORY"
  );
  const [kda, setKDA] = useState<number[]>([0, 0, 0]);
  useEffect(() => {
    if (match && player) {
      const matchPlayer = match?.players?.all_players.find(
        (p) => p.puuid === player.puuid
      );
      const teamSide: matchTeam = matchPlayer?.team.toLowerCase() as any;
      setResult(
        match.teams[teamSide]?.has_won === undefined
          ? "OTHER"
          : match.teams[teamSide]?.has_won
          ? "VICTORY"
          : "DEFEAT"
      );

      setKDA([
        matchPlayer?.stats.kills,
        matchPlayer?.stats.deaths,
        matchPlayer?.stats.assists,
      ] as number[]);
    }
  }, [player, match, maps]);

  const gameDuration = `${Math.trunc(
    (match?.metadata.game_length as number) / 1000 / 60
  )}:${
    Math.trunc(((match?.metadata.game_length as number) / 1000) % 60) < 10
      ? "0"
      : ""
  }${Math.trunc(((match?.metadata.game_length as number) / 1000) % 60)}`;

  return (
    <div className="match-card__container">
      <Image
        src={
          maps?.find((map) => map.displayName === match?.metadata.map)
            ?.splash as string
        }
        alt="Map Image"
        width={1920}
        height={1080}
        className="match-card__container-img"
      ></Image>
      <div className="match-card__container-content">
        <div className="match-card__container-content__left">
          <span className="match-card__container-content__left-map">
            {match?.metadata.map}
          </span>
          {result === "OTHER" ? (
            <></>
          ) : (
            <span
              className="match-card__container-content__left-result"
              style={{ color: result === "VICTORY" ? "#118578" : "#fc4356" }}
            >
              {result}
            </span>
          )}
          <div
            style={{
              transform: result !== "OTHER" && !isMobile ? "translateY(24px)" : "none",
            }}
            className="match-card__container-content__left-mode"
          >
            <span>{match?.metadata.mode} </span>
            <span>{`(${gameDuration})`}</span>
          </div>
        </div>
        <div className="match-card__container-content__right">
          <div className="match-card__container-content__right-info">
            <span></span>
          </div>
          <span
            className="match-card__container-content__right-info__kda"
            style={{
              color:
                (kda[0] + kda[2]) / kda[1] > 0
                  ? "#118578"
                  : (kda[0] + kda[2]) / kda[1] < 0
                  ? "#fc4356"
                  : "#707070",
            }}
          >{`${kda[0]}/${kda[1]}/${kda[2]}`}</span>
          <Image
            src={
              match?.players.all_players.find((p) => p.puuid === player.puuid)
                ?.assets.agent.small as string
            }
            alt="Agent Image"
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
          ></Image>
          <span className="match-card__container-content__right-info__date">
            {match?.metadata.game_start_patched}
          </span>
        </div>
      </div>
    </div>
  );
}

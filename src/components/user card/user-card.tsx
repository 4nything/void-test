import { IAccount } from "@/shared/models/valorant/account";
import { useGetAccountAndMatchesQuery } from "@/store/apis/void";
import { Loading } from "../loading/loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { MatchCard } from "../match-card/match-card";
import { useEffect, useState } from "react";
import { IMatch } from "@/shared/models/valorant/match";
import { IPlayer } from "@/shared/models/valorant/player";
import { IMap } from "@/shared/models/valorant/map";
import { CardProps } from "@/shared/models/valorant/card";

export function UserCard({ player, maps, tiers, onClick }: CardProps) {
  const { data, isLoading, isError, isSuccess } = useGetAccountAndMatchesQuery({
    name: player.gameName,
    tag: player.tagLine,
    puuid: player.puuid,
  });

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width < 960;

  if (isError || player.IsAnonymized) {
    return (
      <div>
        <button
          className="close-icon"
          onClick={onClick ? () => onClick() : () => {}}
        >
          <FontAwesomeIcon icon={faClose} size="2x"></FontAwesomeIcon>
        </button>
        <span>User Not Found or Anonymous</span>
      </div>
    );
  }

  if (isLoading) {
    return <Loading title="Matches" />;
  }

  if (isError) {
    return <div className="errorFetch">#404 - Error getting post</div>;
  }

  const account: IAccount | undefined = data?.account;
  const matches: IMatch[] | undefined = data?.matches;

  return (
    <div>
      <button
        className="close-icon"
        onClick={onClick ? () => onClick() : () => {}}
      >
        <FontAwesomeIcon icon={faClose} size="2x"></FontAwesomeIcon>
      </button>
      <div className="user-card__container-nest">
        {isLoading ? <Loading title="Players"></Loading> : <></>}
        {isError ? <div>error</div> : <></>}
        {isSuccess ? (
          <div className="user-card__content">
            <div className="user-card__info">
              <Image
                src={
                  tiers?.find((tier) => tier.tier === player.competitiveTier)
                    ?.smallIcon as string
                }
                alt="Tier RANK"
                width={62}
                height={62}
              ></Image>
              <Image
                className="user-card__info-img"
                src={
                  isMobile
                    ? (account?.card.wide as string)
                    : (account?.card.large as string)
                }
                width={188}
                height={450}
                alt="Account Image"
              ></Image>
              <span className="user-card__name">{account?.name}</span>
            </div>
            <div className="user-card__matches">
              {matches ? (
                matches.map((match, index) => {
                  return renderAvailableMatches(
                    match,
                    index,
                    player,
                    maps,
                    isMobile
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

function renderAvailableMatches(
  match: IMatch,
  index: number,
  player: IPlayer,
  maps: IMap[] | undefined,
  isMobile: boolean
): JSX.Element {
  const matches = (
    <MatchCard
      key={index}
      match={match}
      player={player}
      maps={maps}
      isMobile={isMobile}
    ></MatchCard>
  );
  return "is_available" in match ? (
    match.is_available ? (
      matches
    ) : (
      <></>
    )
  ) : (
    matches
  );
}

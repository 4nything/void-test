import { options, Region, styleOptions } from "@/shared/consts/dashboard";
import { useGetLeaderboardQuery } from "@/store/apis/void";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";
import { Loading } from "@/components/loading/loading";
import { Card } from "@/components/card/card";
import { UserCard } from "@/components/user card/user-card";
import { IPlayer } from "@/shared/models/valorant/player";
import { ITier } from "@/shared/models/valorant/tier";
import { IMap } from "@/shared/models/valorant/map";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard(this: any) {
  const [region, setRegion] = useState<Region>("latam");
  const [page, setPage] = useState<number>(1);
  const [renderPlayers, setRenderPlayers] = useState<IPlayer[]>([]);
  const [renderPlayersAux, setRenderPlayersAux] = useState<IPlayer[]>([]);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [tiers, setTiers] = useState<ITier[]>([]);
  const [maps, setMaps] = useState<IMap[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [playerSelected, setPlayerSelected] = useState<IPlayer | null>(null);

  const { data, isLoading, isSuccess, isError } =
    useGetLeaderboardQuery(region);

  useEffect(() => {
    if (isSuccess && data?.leaderboard.length) {
      setPlayers(data.leaderboard);
      setRenderPlayers(data.leaderboard.slice(0, 1000));
      setRenderPlayersAux(data.leaderboard.slice(0, 1000));
    }
    if (isSuccess && data?.tiers.length) {
      setTiers(data.tiers);
    }
    if (isSuccess && data?.maps.length) {
      setMaps(data.maps);
    }
  }, [data, isSuccess]);

  const onHandlePlayers = () => {
    if (renderPlayers?.length === players.length) {
      return;
    }
    setRenderPlayers([
      ...renderPlayers,
      ...players.slice(1000 * page, 1000 * (page + 1)),
    ]);
    setRenderPlayersAux(renderPlayers);
    setPage(page + 1);
  };

  const handleFilter = (event: any) => {
    const filterValue = event.target.value.toLowerCase();
    if (filterValue.length < 3) {
      setRenderPlayers(renderPlayersAux);
    }
    setRenderPlayers(
      filterValue.length
        ? players.filter(
            (player) =>
              (player.IsAnonymized
                ? "secret agent".includes(filterValue)
                : player.gameName.toLowerCase().includes(filterValue)) ||
              player.tagLine.toLowerCase().includes(filterValue)
          )
        : renderPlayersAux
    );
    setIsFiltered(filterValue.length);
  };

  const handleChangeRegion = (selectedOption: any) => {
    setRegion(selectedOption.value);
  };

  if (isError) {
    return <div className="errorFetch">#404 - Error getting post</div>;
  }

  return (
    <div className="dashboard">
      {isLoading ? <Loading title="Players"></Loading> : <></>}
      {isError ? (
        <div className="errorFetch">#404 - Error getting Players</div>
      ) : (
        <></>
      )}
      {isSuccess ? (
        <div className="infinite-container" id="infiniteContainer">
          <div className="search-box">
            <button className="btn-search">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
              onKeyUp={handleFilter}
            ></input>
          </div>
          <div className="region-box">
            <Select
              options={options}
              styles={styleOptions}
              onChange={handleChangeRegion}
            />
          </div>
          <InfiniteScroll
            dataLength={1000 * page}
            next={() => onHandlePlayers()}
            hasMore={!isFiltered && players?.length / 1000 > page}
            loader={<Loading title="more players" />}
            className="infinite-scroll"
            scrollableTarget="infiniteContainer"
            style={{ overflow: "hidden" }}
          >
            <div className="dashboard-table">
              {renderPlayers.map((player) => {
                return (
                  <Card
                    key={player.leaderboardRank}
                    player={player}
                    onClick={(player?: IPlayer) =>
                      setPlayerSelected(player ? player : null)
                    }
                    tiers={tiers}
                  ></Card>
                );
              })}
            </div>
          </InfiniteScroll>
          {playerSelected ? (
            <div className="user-card__container">
              <UserCard
                player={playerSelected}
                maps={maps}
                tiers={tiers}
                onClick={() => setPlayerSelected(null)}
              ></UserCard>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

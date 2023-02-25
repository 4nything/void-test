import { IPost } from "@/shared/models/posts/post";
import { IAccountResponse } from "@/shared/models/valorant/account";
import { ILeaderboard } from "@/shared/models/valorant/leaderboard";
import { IMap } from "@/shared/models/valorant/map";
import { IMatchResponse } from "@/shared/models/valorant/match";
import { ITier } from "@/shared/models/valorant/tier";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const voidApi = createApi({
  reducerPath: "voidApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.henrikdev.xyz",
  }),
  tagTypes: ["GET"],
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const leaderboardRes = await fetchWithBQ(
          `/valorant/v2/leaderboard/${_arg}`
        );
        if (leaderboardRes.error) throw leaderboardRes.error;
        const leaderboard = leaderboardRes.data as ILeaderboard;
        const tiers: ITier[] = await fetch(
          "https://valorant-api.com/v1/competitivetiers"
        )
          .then((res) => res.json())
          .then((res) => res.data.at(-1).tiers);
        const maps: IMap[] = await fetch("https://valorant-api.com/v1/maps")
          .then((res) => res.json())
          .then((res) =>
            res.data.map((map: IMap) => ({
              displayName: map.displayName,
              listViewIcon: map.listViewIcon,
              splash: map.splash,
            }))
          );
        return leaderboard && tiers
          ? { data: { leaderboard: leaderboard.players, tiers, maps } }
          : { data: null };
      },
    }),
    getAccountAndMatches: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const accountRes = await fetchWithBQ(
          `/valorant/v1/by-puuid/account/${_arg.puuid}`
        );
        if (accountRes.error) throw accountRes.error;
        const account = accountRes.data as IAccountResponse;
        const matchesRes = await fetchWithBQ(
          `/valorant/v3/matches/${account.data.region}/${_arg.name}/${_arg.tag}`
        );
        if (matchesRes.error) throw matchesRes.error;
        const matches = matchesRes.data as IMatchResponse;
        return account && matches
          ? {
              data: {
                account: account.data,
                matches: matches.data,
              },
            }
          : { data: null };
      },
    }),
    getPosts: builder.query({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        const post = await fetchWithBQ(
          "https://6396aee2a68e43e41808fa18.mockapi.io/api/posts"
        );
        if (post.error) throw post.error;
        return { data: post.data as IPost[] };
      },
    }),
    getPost: builder.query({
      async queryFn(_args, _queryApi, _extraOptions, fetchWithBQ) {
        const post = await fetchWithBQ(
          `https://6396aee2a68e43e41808fa18.mockapi.io/api/posts/${_args}`
        );
        if (post.error) throw post.error;
        return { data: post.data as IPost };
      },
    }),
  }),
});
export const {
  useGetLeaderboardQuery,
  useGetAccountAndMatchesQuery,
  useGetPostsQuery,
  useGetPostQuery,
} = voidApi;

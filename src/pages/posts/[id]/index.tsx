import { Loading } from "@/components/loading/loading";
import { useGetPostQuery } from "@/store/apis/void";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Post } from "@/components/post/post";
import { IPost } from "@/shared/models/posts/post";

export default function UniquePost() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isSuccess, isError, isLoading } = useGetPostQuery(
    id ? id : skipToken
  );

  const post = data as IPost;

  if (isLoading) {
    return <Loading title="Post"></Loading>;
  }

  if (isError) {
    return <div className="errorFetch">#404 - Error getting post</div>;
  }
  return (
    <div className="posts">{isSuccess ? <Post post={post}></Post> : <></>}</div>
  );
}

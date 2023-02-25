import { Loading } from "@/components/loading/loading";
import { Post } from "@/components/post/post";
import { IPost } from "@/shared/models/posts/post";
import { useGetPostsQuery } from "@/store/apis/void";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Posts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [renderPosts, setRenderPosts] = useState<IPost[]>([]);
  const [renderPostsAux, setRenderPostsAux] = useState<IPost[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError, isSuccess } = useGetPostsQuery("");
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && data.length) {
      setPosts(data);
      setRenderPosts(data.slice(0, 5));
      setRenderPostsAux(data.slice(0, 5));
    }
  }, [isSuccess, data]);

  const handleFilter = (event: any) => {
    var timer: any = 0;
    clearTimeout(timer);
    timer = setTimeout(() => {
      const filterValue = event.target.value.toLowerCase();
      if (!filterValue.length) {
        setIsFiltered(false);
        setRenderPosts(renderPostsAux);
      }
      setRenderPosts(
        renderPostsAux.filter(
          (post: IPost) =>
            post.postText.toLowerCase().includes(filterValue) ||
            post.authorName.toLowerCase().includes(filterValue)
        )
      );
      setIsFiltered(true);
    }, 500 || 0);
  };

  const handlePosts = () => {
    setRenderPosts([...renderPosts, ...posts.slice(page * 5, 5 * (page + 1))]);
    setRenderPostsAux([
      ...renderPosts,
      ...posts.slice(page * 5, 5 * (page + 1)),
    ]);
    setPage(page + 1);
  };

  const handleRedirect = (id: string) => {
    router.push(`/posts/${id}`);
  };

  if (isLoading) {
    return <Loading title="Posts" />;
  }
  if (isError) {
    return <div className="errorFetch">#404 - Error getting posts</div>;
  }
  return (
    <div className="posts">
      <div className="posts-search-box">
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
      <div className="posts-container">
        {isSuccess ? (
          <div className="infinite-container-posts" id="infiniteContainer">
            <InfiniteScroll
              dataLength={5 * page}
              next={() => handlePosts()}
              hasMore={!isFiltered && posts?.length / 5 > page}
              loader={<Loading title="more posts" />}
              className="infinite-scroll"
              scrollableTarget="infiniteContainer"
              style={{ overflow: "hidden" }}
            >
              <div className="posts-table">
                {renderPosts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    onClick={(id: string) => handleRedirect(id)}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

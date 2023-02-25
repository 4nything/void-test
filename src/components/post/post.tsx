import { IPost } from "@/shared/models/posts/post";
import Image from "next/image";

type PostProps = {
  post: IPost;
  onClick?: (id: string) => void;
};

export function Post({ post, onClick }: PostProps) {
  const diffDays =
    ((new Date(post.createdAt).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)) *
    -1;
  const diffHours =
    ((new Date(post.createdAt).getTime() - new Date().getTime()) /
      (1000 * 60 * 60)) *
    -1;
  return (
    <div className="posts-table__post" onClick={onClick ? () => onClick(post.id) : () => {}}>
      <div className="posts-table__post-header">
        <Image
          src={post.authorAvatar}
          alt={post.authorName}
          width={62}
          height={62}
          className="posts-table__post-header-avatar"
        ></Image>
        <div className="posts-table__post-header__info">
          <span className="posts-table__post-header__info-author">
            {post.authorName}
          </span>
          <span className="posts-table__post-header__info-time">
            {Math.trunc(diffDays) < 1
              ? Math.trunc(diffHours) < 1
                ? "a few minutes ago"
                : `${Math.trunc(diffHours)}h.`
              : `${Math.trunc(diffDays)}d.`}
          </span>
        </div>
      </div>
      <div className="posts-table__post-content">
        <span>{post.postText}</span>
        <Image
          src={post.postImage}
          alt="Post Image"
          width={640}
          height={480}
        ></Image>
      </div>
    </div>
  );
}

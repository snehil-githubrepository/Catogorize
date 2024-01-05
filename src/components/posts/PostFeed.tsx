import React from "react";
import usePosts from "@/hooks/usePosts";
import PostItem from "@/components/posts/PostItem";

interface postFeedProps {
  userId?: string;
}
const PostFeed: React.FC<postFeedProps> = ({ userId }) => {
  //   const { data: posts = [] } = usePosts(userId);

  const posts = [{ userId: "1", id: "23", post: "first" }];

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;

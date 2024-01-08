import React from "react";
import { useRouter } from "next/router";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import Nav from "@/components/Nav";
import TextArea from "@/components/TextArea";
import PostItem from "@/components/posts/PostItem";
import Layout from "@/components/Layout";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <Layout>
      <Nav label="Catogorize" showBackArrow />
      <PostItem data={fetchedPost} />
      <TextArea
        placeholder="Post Your Reply"
        postId={postId as string}
        isComment
      />
    </Layout>
  );
};
export default PostView;

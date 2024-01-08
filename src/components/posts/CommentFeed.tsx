import React from "react";
import CommentItem from "@/components/posts/CommentItem";

interface CommentFeedProps {
  comments?: Record<string, any>[]; // Check the structure of comments data
}
const CommentFeed: React.FC<CommentFeedProps> = ({ comments = [] }) => {
  // Ensure comments exist and have data
  if (!comments || comments.length === 0) {
    return <p className="p-5 text-white">Comments : None</p>; // Render a message if no comments
  }

  return (
    <>
      {comments.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;

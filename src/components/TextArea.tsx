import React, { useCallback, useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import usePost from "@/hooks/usePost";

interface TxtAreaProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const TextArea: React.FC<TxtAreaProps> = ({
  postId,
  isComment,
  placeholder,
}) => {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = isComment ? `/api/comment?postId=${postId}` : `/api/posts`;
      await axios.post(url, { body });
      toast.success("Post Created");
      setBody("");
      await mutatePosts();
      mutatePost();
    } catch (e) {
      toast.error("something went wrong");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts]);

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(true);
  };

  // Function to handle selecting an emoji from the picker
  const handleEmojiSelect = () => {
    setShowEmojiPicker(false);
  };

  const handleCatogorizeButtonClick = () => {
    // Functionality for catogorize button click
    // Implement the functionality for categorizing the post/comment
  };

  const handleImagesLinkButtonClick = () => {
    // Functionality for images link button click
    // Implement the functionality for adding image links to the post/comment
  };

  return (
    <div className="border-b-[1px] border-neutral-800 bg-black px-5 py-2 mb-5 ml-2.5 mr-2.5 rounded-lg">
      <div className="flex flex-row gap-4">
        <div className="mt-4">
          <Avatar userId={currentUser?.id} />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="disabled:opacity-80 peer rounded-md resize-none mt-3 w-full bg-gray-900 ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
            placeholder={placeholder}
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-300 transition" />

          <div className="mt-4 flex flex-row justify-end">
            <div>
              <Button
                label="Post"
                onClick={onSubmit}
                disabled={isLoading || !body}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextArea;

//CONDITIONAL IF NOT LOGGED IN
//) : (
//     <div className="py-8">
//       <h1 className="text-black text-2xl text-center mb-4 font-bold">
//         Welcome to Catogorize
//       </h1>
//       <div className="flex flex-row items-center justify-center gap-4">
//         <Button />
//         <Button />
//       </div>
//     </div>
//     )

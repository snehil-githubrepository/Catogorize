import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "@/store/modelAtom";
import useCurrentUser from "@/hooks/useCurrentUser";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "@/components/Avatar";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface postItemProps {
  data: Record<string, any>;
  userId?: string;
}
const PostItem: React.FC<postItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const setOpenLoginModal = useSetRecoilState(loginAtom);
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/users/${data.userId}`);
    },
    [router, data.userId]
  );

  const goToPost = useCallback(
    (e: any) => {
      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );

  const onLike = useCallback(
    async (e: any) => {
      e.stopPropagation();
      if (!currentUser) {
        return setOpenLoginModal({ isOpen: true });
      }
      toggleLike();
    },
    [currentUser, setOpenLoginModal, toggleLike]
  );

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);
  return (
    <div
      onClick={goToPost}
      className="
                border-b-[1px]
                border-neutral-800
                bg-black
                p-5
                m-2
                rounded-xl
                cursor-pointer
                hover:bg-gray-800
                transition
        "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="
                                text-white
                                font-semibold
                                cursor-pointer
                                hover:underline
                        "
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="
                                text-neutral-500
                                cursor-pointer
                                hover:underline
                                hidden
                                md:block
                            "
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-2
                                cursor-pointer
                                transition
                                hover:text-sky-500
                            "
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="
                                flex
                                flex-row
                                items-center
                                text-neutral-500
                                gap-2
                                cursor-pointer
                                transition
                                hover:text-red-500
                            "
            >
              <LikeIcon color={hasLiked ? "red" : ""} size={20} />
              <p>{data.likedIds.length}</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

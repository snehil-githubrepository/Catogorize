import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { formatDistanceToNowStrict } from "date-fns";
import Avatar from "@/components/Avatar";

interface commentItemProps {
  data: Record<string, any>;
}
const CommentItem: React.FC<commentItemProps> = ({ data = {} }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (e: any) => {
      e.stopPropagation();
      router.push(`/user/${data.user.id}`);
    },
    [data.user.id, router]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);
  return (
    <div
      className="
                border-b-[1px]
                border-neutral-800
                bg-black
                m-2
                p-5
                rounded-lg
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
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

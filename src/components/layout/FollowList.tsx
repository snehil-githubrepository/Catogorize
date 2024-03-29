import React from "react";
import useUsers from "@/hooks/useUsers";
import Avatar from "@/components/Avatar";

const FollowBar = () => {
  const { data = [] } = useUsers();
  if (data.length === 0) {
    return null;
  }
  return (
    <div className="px-6 ml-16 py-4 w-80 hidden lg:block">
      <div className="bg-black rounded-xl p-4">
        <h2 className="text-pink-100 flex justify-center text-xl font-semibold">
          Who to Follow
        </h2>
        <div className="flex flex-col gap-6 mt-4">
          {[...data].map((user: Record<string, any>) => (
            <div key={user.id} className="flex flex-row gap-4">
              <Avatar userId={user.id} />
              <div className="flex flex-col">
                <p className="text-white font-semibold text-sm">{user.name}</p>
                <p className="text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;

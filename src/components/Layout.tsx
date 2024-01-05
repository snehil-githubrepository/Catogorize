import React from "react";
import Sidebar from "@/components/layout/Sidebar";
import FollowList from "@/components/layout/FollowList";

interface layoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-900">
      <div className="container h-full mx-auto xl:px-30 max-w-6xl">
        <div className="grid grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-700">
            {children}
          </div>
          <FollowList />
        </div>
      </div>
    </div>
  );
};

export default Layout;

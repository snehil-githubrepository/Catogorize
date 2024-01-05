import React from "react";
import { useRouter } from "next/router";
import { BiSolidCategoryAlt } from "react-icons/bi";

const SidebarLogo = () => {
  const router = useRouter();
  return (
    <div className="rounded-full h-14 w-14 p-4 flex justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
      <BiSolidCategoryAlt size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;

import React from "react";
import { BsBellFill, BsHouseFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { FaUser } from "react-icons/fa";
import SidebarLogo from "@/components/layout/SidebarLogo";
import SidebarItem from "@/components/layout/SidebarItem";
import { BiLogOut } from "react-icons/bi";
import SidebarPostButton from "@/components/layout/SidebarPostButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const { data } = useCurrentUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login"); // Navigate to the login page after logout
  };
  const items = [
    {
      label: "Home",
      href: "/home",
      icon: BsHouseFill,
      isProtected: false,
    },
    {
      label: "Notifications",
      href: "/home/notifications",
      isProtected: true,
      alert: data?.hasNotification,
      icon: BsBellFill,
    },
    {
      label: "Profile",
      href: `/home/users/${data?.id}`,
      isProtected: true,
      icon: FaUser,
    },
  ];
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-center">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isProtected={item.isProtected}
              alert={item.alert}
            ></SidebarItem>
          ))}

          <SidebarItem
            onClick={handleLogout}
            icon={BiLogOut}
            label="logout"
          ></SidebarItem>
          <SidebarPostButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

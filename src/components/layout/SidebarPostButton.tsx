import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { FaCat } from "react-icons/fa";
import { useSetRecoilState } from "recoil";
import { loginAtom } from "@/store/modelAtom";
import useCurrentUser from "@/hooks/useCurrentUser";

const SidebarPostButton = () => {
  const setLoginIsOpen = useSetRecoilState(loginAtom);
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const onClick = useCallback(() => {
    if (!currentUser) {
      setLoginIsOpen({ isOpen: true });
    }
    router.push("/");
  }, [currentUser, router, setLoginIsOpen]);

  return (
    <div onClick={onClick}>
      <div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center bg-sky-500 hover:bg-opacity-50 transition cursor-pointer">
        <FaCat size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block rounded-full px-4 py-2 bg-sky-500 hover:bg-opacity-90 transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarPostButton;

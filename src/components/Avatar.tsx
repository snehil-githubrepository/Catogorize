import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

interface avatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}
const Avatar: React.FC<avatarProps> = ({ userId, isLarge, hasBorder }) => {
  const router = useRouter();
  const onClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      const url = `/user/${userId}`;
      router.push(url);
    },
    [router, userId]
  );
  return (
    <div
      className={`
            cursor-pointer
            rounded-full
            relative
            ${isLarge ? `w-32` : `w-12`}
            ${isLarge ? `h-32` : `h-12`}
            ${hasBorder ? `border-4 border-black` : ``}
        `}
    >
      <Image
        src={"/images/placeholder.png"}
        alt="Avatar"
        fill
        onClick={onClick}
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
      />
    </div>
  );
};

export default Avatar;

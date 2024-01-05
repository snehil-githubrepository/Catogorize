import React, { useState } from "react";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";

interface TxtAreaProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const TextArea: React.FC<TxtAreaProps> = ({ postId, placeholder }) => {
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="border-b-[1px] border-neutral-800 bg-white px-5 py-2 mb-5 ml-1 mr-1 rounded-lg">
      <div className="flex flex-row gap-4">
        <div>
          <Avatar userId="1" />
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="disabled:opacity-80 peer rounded-md resize-none mt-3 w-full bg-gray-100 ring-0 outline-none text-[20px] placeholder-neutral-500 text-black"
            placeholder={placeholder}
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-300 transition" />
          <div className="mt-4 flex flex-row justify-end">
            <Button text="Post" />
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

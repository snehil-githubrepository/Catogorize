import React from "react";

interface ButtonProps {
  onClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {text}
    </button>
  );
};

export default Button;

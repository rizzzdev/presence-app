"use client";

import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
  const [disabled, setDisabled] = useState(false);

  const onClick = () => {
    setDisabled(true);

    setTimeout(() => {
      alert("Logout Success");
      setDisabled(false);
    }, 5000);
  };

  return (
    <div className="w-full flex justify-center items-center p-2 border-t border-t-white/10">
      <button
        className={`w-full p-2 ${disabled ? "bg-red-600/10 border-red-600 text-red-600/80 cursor-not-allowed" : "bg-red-600/20 hover:bg-red-600/30 border-red-600 text-red-600 cursor-pointer"}  border  rounded-lg flex gap-2 justify-center items-center text-sm`}
        disabled={disabled}
        onClick={onClick}
      >
        <IoLogOutOutline className="text-xl" />
        Keluar
      </button>
    </div>
  );
};

export default LogoutButton;

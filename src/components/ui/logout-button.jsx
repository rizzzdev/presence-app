"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { meStateAtom } from "~/features/login/stores/me-store";
import { deleteSessionById } from "~/features/session/api/session-api";
import { toastsAtom } from "./toast";

const LogoutButton = () => {
  const [disabled, setDisabled] = useState(false);
  const setToasts = useSetAtom(toastsAtom);
  const { session, accessToken } = useAtomValue(meStateAtom);
  const router = useRouter();

  const onClick = async () => {
    setDisabled(true);

    const response = await deleteSessionById(session.id, accessToken);

    if (response.error) {
      setToasts((prev) => [
        ...prev,
        { type: "error", message: "Logout gagal" },
      ]);
    }

    if (!response.error) {
      localStorage.removeItem("access-token");
      setToasts((prev) => [
        ...prev,
        { type: "success", message: "Logout berhasil" },
      ]);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  return (
    <div className="w-full flex justify-center items-center self-end p-2 border-t border-t-white/10 mt-10">
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

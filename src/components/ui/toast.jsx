"use client";

import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BsExclamationSquare } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

const ToastType = (props) => {
  const { type = "info", message = "Hello World" } = props;
  const [isVisible, setIsVisible] = useState(true);

  const bgColors = {
    success: "bg-green-600/80",
    error: "bg-red-600/80",
    warning: "bg-accent/80",
    info: "bg-black/60",
  };

  const Icons = {
    success: FaCheckCircle,
    error: BsExclamationSquare,
    warning: BsExclamationSquare,
  };

  const Icon = Icons[type];

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 5000);
  }, []);

  return (
    <div
      className={`w-full ${isVisible ? "flex" : "hidden"} p-2 gap-2 justify-start items-center ${bgColors[type]} rounded-lg text-white/90`}
    >
      {Icon && <Icon className="text-xl text-white/90" />}
      <p className="text-[10px] font-semibold">{message}</p>
    </div>
  );
};

export const toastsAtom = atom([]);

const Toast = () => {
  const [toasts, setToasts] = useAtom(toastsAtom);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setToasts([]);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [toasts, setToasts]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="w-full md:min-w-72 md:w-fit flex flex-col justify-end items-center gap-2 p-2 absolute right-0 bottom-0 z-9000">
      {toasts.map((toast, index) => {
        return (
          <ToastType key={index} type={toast.type} message={toast.message} />
        );
      })}
    </div>
  );
};

export default Toast;

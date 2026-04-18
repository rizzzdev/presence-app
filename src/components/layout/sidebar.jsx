"use client";

import { useAtomValue } from "jotai";
import Logo from "../ui/logo";
import LogoutButton from "../ui/logout-button";
import Menu from "../ui/menu";
import UserSessionCard from "../ui/user-session-card";
import { isHamburgerOpenAtom } from "../ui/hamburger";

const Sidebar = () => {
  const isHamburgerOpen = useAtomValue(isHamburgerOpenAtom);

  return (
    <aside
      className={`w-56 h-screen flex flex-col justify-between items-start bg-sidebar fixed top-0 left-0 border-r border-r-white/10 z-99 ${isHamburgerOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 transition-all duration-500`}
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Logo />
        <UserSessionCard name="John Doe" role="Admin" />
        <Menu />
      </div>
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillXDiamondFill } from "react-icons/bs";
import { FaPenNib } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { IoIosWarning } from "react-icons/io";
import { LuTarget } from "react-icons/lu";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import LogoutButton from "./logout-button";

const MenuList = (props) => {
  const { href, Icon, title } = props;

  const path = usePathname();

  const isActive = "/" + path.split("/")[1] === href;

  return (
    <Link
      href={href}
      className={`w-full px-4 py-2 text-xs text-white/80 flex justify-start items-center gap-2 group hover:bg-accent/10 border-l-3 hover:border-l-accent hover:font-semibold ${isActive ? "bg-accent/10 border-accent font-semibold" : "border-sidebar"}`}
    >
      <Icon
        className={`text-md group-hover:text-accent ${isActive ? "text-accent" : "text-white/80"}`}
      />
      {title}
    </Link>
  );
};

const MenuWrapper = (props) => {
  const { children, title } = props;

  return (
    <div className="w-full flex flex-col justify-center items-center text-xs text-white/80 bg-sidebar mt-1 gap-1">
      <h3 className="w-full px-3">{title}</h3>
      <div className="w-full flex flex-col justify-center items-center gap-1">
        {children}
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between items-center mt-2 gap-4 overflow-y-auto scrollbar-thin relative">
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <MenuWrapper title="UTAMA">
          <MenuList href="/" title="Dashboard" Icon={BsFillXDiamondFill} />
        </MenuWrapper>
        <MenuWrapper title="PRESENSI">
          <MenuList
            href="/automatic-presence"
            title="Presensi Otomatis"
            Icon={LuTarget}
          />
          <MenuList
            href="/manual-presence"
            title="Presensi Manual"
            Icon={FaPenNib}
          />
          <MenuList
            href="/presence-recap"
            title="Rekap Presensi"
            Icon={MdLibraryBooks}
          />
        </MenuWrapper>
        <MenuWrapper title="PELANGGARAN">
          <MenuList
            href="/violation"
            title="Catat Pelanggaran"
            Icon={IoIosWarning}
          />
          <MenuList
            href="/violation-recap"
            title="Rekap Pelanggaran"
            Icon={MdLibraryBooks}
          />
        </MenuWrapper>
        <MenuWrapper title="LAINNYA">
          <MenuList
            href="/picket-schedule"
            title="Jadwal Piket"
            Icon={RiCalendarScheduleFill}
          />
          <MenuList
            href="/about-developer"
            title="Tentang Pengembang"
            Icon={FaPeopleGroup}
          />
        </MenuWrapper>
      </div>
      <LogoutButton />
    </div>
  );
};

export default Menu;

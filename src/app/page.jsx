"use client";

import Sidebar from "~/components/layout/sidebar";
import Topbar from "~/components/layout/topbar";
import Wrapper from "~/components/layout/wrapper";

export default function Home() {
  return (
    <Wrapper topbarTitle="Dashboard" topbarDescription="Selamat Datang">
      <h3 className="w-full text-white">Hello</h3>
    </Wrapper>
  );
}

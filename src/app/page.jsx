"use client";

import Wrapper from "~/components/layout/wrapper";
import StatsCard from "~/components/ui/stats-card";
import StatsCardDashboard from "~/components/ui/stats-card-dashboard";

export default function Home() {
  return (
    <Wrapper topbarTitle="Dashboard" topbarDescription="Selamat Datang">
      <h3 className="w-full flex flex-col justify-center items-center text-white">
        Hello
      </h3>
      <div className="w-full grid grid-cols-2 md:grid-cols-4 justify-center items-stretch gap-2">
        <StatsCardDashboard
          title="Jumlah Siswa"
          value="100"
          footer="12 kelas"
          borderTopColor="yellow"
        />
        <StatsCardDashboard
          borderTopColor="green"
          title="Hadir Hari Ini"
          value="80"
          footer="80% dari keseluruhan"
        />
        <StatsCardDashboard
          title="Tidak Hadir Hari Ini"
          value="20"
          footer="Absen + Ijin + Sakit"
        />
        <StatsCardDashboard
          borderTopColor="blue"
          title="Pelanggaran Hari Ini"
          value="10"
          footer="Oleh 10 siswa"
        />
        <StatsCard title="Hadir" value="33" />
        <StatsCard title="Terlambat" value="12" color="yellow" />
        <StatsCard title="Belum Hadir" value="5" color="red" />
      </div>
    </Wrapper>
  );
}

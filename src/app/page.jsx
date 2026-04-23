"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import Wrapper from "~/components/layout/wrapper";
import { Button, Date, Dropdown } from "~/components/ui/form";
import Loading from "~/components/ui/loading";
import StatsCard from "~/components/ui/stats-card";
import StatsCardDashboard from "~/components/ui/stats-card-dashboard";
import useApi from "~/features/session/hooks/use-api";
import { useAuth } from "~/features/session/hooks/use-auth";
import { teachersAtom } from "~/features/teacher/stores/teacher-store";

export default function Home() {
  const { isLoading } = useAuth();

  const [teachers, setTeachers] = useAtom(teachersAtom);

  const { execute } = useApi("/teachers", {
    params: {
      includeAll: "true",
    },
  });

  const handleClick = async () => {
    const response = await execute();

    if (!response?.error && response?.data) {
      setTeachers(response?.data);
      return;
    }
    setTeachers([]);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper topbarTitle="Dashboard" topbarDescription="Selamat Datang">
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
      <Button onClick={handleClick}>Summon Guru</Button>
      <div className="w-full flex flex-col">
        {teachers.map((teacher) => {
          return (
            <p key={teacher.id} className="text-white/80 text-xs">
              {teacher.name}
            </p>
          );
        })}
      </div>
    </Wrapper>
  );
}

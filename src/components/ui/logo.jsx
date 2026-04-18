import Link from "next/link";

const Logo = (props) => {
  const { type = "sidebar" } = props;

  return (
    <Link
      href={"/"}
      className={`w-full flex ${type === "sidebar" ? "h-20 flex-row border-b border-b-white/10" : "flex-col"} justify-start items-center gap-2 p-4`}
    >
      <span
        className={`${type === "sidebar" ? "w-10 h-10 text-2xl" : "w-16 h-16 text-4xl"} aspect-square p-1 flex justify-center items-center rounded-md bg-accent text-white font-semibold`}
      >
        P
      </span>
      <div
        className={`w-full flex flex-col justify-center ${type === "sidebar" ? "items-start" : "items-center"} text-white/80`}
      >
        <h3
          className={`${type === "sidebar" ? "text-lg" : "text-2xl"} font-semibold`}
        >
          Presence
        </h3>
        {type === "sidebar" && (
          <p className="text-[10px] w-full text-white/60">
            Presensi dan Pelanggaran
          </p>
        )}
        {type === "hero" && (
          <p className="text-sm w-full text-center text-white/60">
            Sistem Presensi dan Pelanggaran Siswa
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;

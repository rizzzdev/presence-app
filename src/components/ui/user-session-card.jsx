import { useAtomValue } from "jotai";
import { meStateAtom } from "~/features/login/stores/me-store";

const UserInfo = (props) => {
  const { name, role } = props;

  return (
    <div className="w-full flex flex-col justify-center items-start text-[10px] text-white/40">
      <h3 className="text-xs text-white/80 font-semibold">{name}</h3>
      <p>{role}</p>
    </div>
  );
};

const ActiveSession = () => {
  const { session } = useAtomValue(meStateAtom);
  const loginTimeString = session?.createdAt;
  const loginTime = new Date(loginTimeString);
  const loginTimeWib = new Date(loginTime.getTime() + 7 * 60 * 60 * 1000);
  const hours = loginTimeWib.getUTCHours();
  const minutes = loginTimeWib.getUTCMinutes();

  return (
    <div className="w-full flex justify-between gap-4 items-center text-[10px] text-white/40">
      <div className="w-full flex justify-start items-center gap-2">
        <span className="w-2 h-2 aspect-square bg-green-600 rounded-full"></span>
        <p className="">Sesi Aktif</p>
      </div>
      <p className="w-full text-right">
        Login {hours}:{minutes}
      </p>
    </div>
  );
};

const UserSessionCard = (props) => {
  const { name, role } = props;
  const { session, teacher } = useAtomValue(meStateAtom);

  return (
    <div className="w-full flex justify-center items-center p-2 border-b border-b-white/10">
      <div className="w-full flex flex-col justify-center items-center gap-4 p-2 bg-white/10 border border-white/20 rounded-lg">
        <div className="w-full flex justify-start items-center gap-2">
          <span className="w-10 h-10 aspect-square rounded-full bg-accent text-white flex justify-center items-center text-xs">
            {teacher?.name
              ? teacher?.name
                  ?.split(" ")
                  ?.map((el) => el[0])
                  ?.slice(0, 2)
                  ?.join("")
                  ?.toUpperCase()
              : "ADM"}
          </span>
          <UserInfo
            name={teacher?.name ? teacher?.name : "Super Admin"}
            role={session?.auth?.role === "USER" ? "Guru" : "Super Admin"}
          />
        </div>
        <ActiveSession />
      </div>
    </div>
  );
};

export default UserSessionCard;

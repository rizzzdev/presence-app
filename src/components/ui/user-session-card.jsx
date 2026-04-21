import { useAtomValue } from "jotai";
import {
  meAtom,
  mySessionAtom,
  myTeacherAtom,
} from "~/features/login/stores/me-store";

const UserInfo = () => {
  // const session = useAtomValue(mySessionAtom);
  // const teacher = useAtomValue(myTeacherAtom);
  const { mySession: session, myTeacher: teacher } = useAtomValue(meAtom);

  const name = teacher?.name ? teacher?.name : "Super Admin";
  const role = session?.auth?.role === "USER" ? "Guru" : "Super Admin";

  return (
    <div className="w-full flex flex-col justify-center items-start text-[10px] text-white/40">
      <h3 className="text-xs text-white/80 font-semibold">{name}</h3>
      <p>{role}</p>
    </div>
  );
};

const ActiveSession = () => {
  // const session = useAtomValue(mySessionAtom);
  const { mySession: session } = useAtomValue(meAtom);
  const loginTimeString = session?.createdAt;
  const loginTime = new Date(loginTimeString);
  const loginTimeWib = new Date(loginTime.getTime() + 7 * 60 * 60 * 1000);
  const hours = loginTimeWib.getUTCHours().toString();
  const minutes = loginTimeWib.getUTCMinutes().toString();

  return (
    <div className="w-full flex justify-between gap-4 items-center text-[10px] text-white/40">
      <div className="w-full flex justify-start items-center gap-2">
        <span className="w-2 h-2 aspect-square bg-green-600 rounded-full"></span>
        <p className="">Sesi Aktif</p>
      </div>
      <p className="w-full text-right">
        Login {hours}:{minutes.length === 1 ? `0${minutes}` : `${minutes}`}
      </p>
    </div>
  );
};

const UserSessionCard = () => {
  // const teacher = useAtomValue(myTeacherAtom);
  const { myTeacher: teacher } = useAtomValue(meAtom);

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
          <UserInfo />
        </div>
        <ActiveSession />
      </div>
    </div>
  );
};

export default UserSessionCard;

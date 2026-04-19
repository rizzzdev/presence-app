import { useEffect, useState } from "react";
import { initialMe, meStateAtom } from "../stores/me-store";
import { useAtom, useSetAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { decodeToken } from "~/libs/decode-token";
import { postAccessToken } from "../stores/access-token-api";
import { getSessionById } from "~/features/session/api/session-api";
import { toastsAtom } from "~/components/ui/toast";
import { getTeacherById } from "~/features/teacher/teacher-api";

const useLogin = () => {
  const [meState, setMeState] = useAtom(meStateAtom);
  const [isLoading, setIsLoading] = useState(true);
  const setToasts = useSetAtom(toastsAtom);
  const router = useRouter();
  const path = usePathname();

  const isTokenValid = async () => {
    const accessToken = localStorage.getItem("access-token");
    const decode = decodeToken(accessToken);
    const newAccessToken = !decode && (await postAccessToken());

    if (newAccessToken) {
      localStorage.setItem("access-token", newAccessToken);
    }

    return decode || newAccessToken;
  };

  const redirect = async () => {
    const isValid = await isTokenValid();
    if (isValid && path === "/login") {
      router.push("/");
    }

    if (!isValid && path === "/login") {
      setIsLoading(false);
    }

    if (!isValid && path !== "/login") {
      router.push("/login");
    }

    if (isValid && path !== "/login") {
      setIsLoading(false);
    }
  };

  const updateMeState = async () => {
    const accessToken = localStorage.getItem("access-token");
    const sessionId = decodeToken(accessToken);

    if (!sessionId) {
      return;
    }

    const sessionResponse = await getSessionById(
      sessionId,
      "auth=true",
      accessToken,
    );

    if (sessionResponse.error) {
      setToasts((prev) => [
        ...prev,
        { type: "error", message: sessionResponse.message },
      ]);
    }

    const teacherResponse =
      sessionResponse.data?.auth?.teacherId &&
      (await getTeacherById(
        sessionResponse.data.auth.teacherId,
        "auth=true",
        accessToken,
      ));

    setMeState({
      ...meState,
      accessToken,
      session: sessionResponse.data,
      ...(teacherResponse?.data && { teacher: teacherResponse.data }),
    });
  };

  useEffect(() => {
    setIsLoading(true);
    setMeState(initialMe);
    redirect();
    updateMeState();
  }, []);

  return { meState, isLoading };
};

export default useLogin;

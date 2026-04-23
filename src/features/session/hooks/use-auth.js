import { atom, useAtom } from "jotai";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { meAtom } from "~/features/login/stores/me-store";
import apiClient, {
  getAccessToken,
  setupAxiosInterceptors,
} from "~/libs/api-client";

export const isAuthenticatedAtom = atom(false);
export const isLoadingAtom = atom(true);

export const useAuth = () => {
  const [me, setMe] = useAtom(meAtom);
  const { isLoading, mySession, myTeacher, isAuthenticated } = me;

  const router = useRouter();
  const path = usePathname();

  const updateAllState = useCallback(
    ({ isAuthenticated, mySession, myTeacher, isLoading }) => {
      setMe((prev) => {
        return {
          ...prev,
          ...(isAuthenticated === false && { isAuthenticated: false }),
          ...(isAuthenticated === true && { isAuthenticated: true }),
          ...(mySession && { mySession }),
          ...(myTeacher && { myTeacher }),
          ...(isLoading === false && { isLoading: false }),
          ...(isLoading === true && { isLoading: true }),
        };
      });
    },
    [setMe],
  );

  useEffect(() => {
    updateAllState({
      isLoading: true,
    });

    const initializeApp = async () => {
      try {
        // get access token
        const response = await fetch("/api/access-tokens", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        setupAxiosInterceptors(data.data);

        updateAllState({
          isAuthenticated: true,
        });
        return;
      } catch (error) {
        updateAllState({
          isAuthenticated: false,
        });

        router.replace("/login");
        return;
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    const updateMySession = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        updateAllState({
          isAuthenticated: false,
        });
        router.replace("/login");

        return;
      }

      const { sessionId } = jwtDecode(accessToken);

      try {
        const sessionResponse = await apiClient({
          url: `/sessions/${sessionId}`,
          params: {
            auth: true,
          },
          method: "GET",
        });

        updateAllState({
          mySession: sessionResponse?.data?.data,
          ...(!sessionResponse?.data?.data?.auth?.teacherId && {
            isLoading: false,
          }),
        });

        return;
      } catch {
        updateAllState({
          isAuthenticated: false,
        });
        router.replace("/login");
      }
    };

    updateMySession();
  }, [isAuthenticated, path]);

  useEffect(() => {
    const updateMyTeacher = async () => {
      if (isAuthenticated && mySession?.auth?.teacherId) {
        const teacherResponse = await apiClient({
          url: `/teachers/${mySession?.auth?.teacherId}`,
          params: {
            auth: true,
          },
          method: "GET",
        });

        updateAllState({
          myTeacher: teacherResponse?.data?.data,
          isLoading: false,
        });
        return;
      }
    };

    updateMyTeacher();
  }, [isAuthenticated, mySession]);

  return {
    isAuthenticated,
    mySession,
    myTeacher,
    isLoading,
  };
};

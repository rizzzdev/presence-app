import { useCallback } from "react";
import useApi from "./use-api";
import { setAccessToken } from "~/libs/api-client";

/**
 * Hook untuk login dan set token
 */
export const useLogin = () => {
  const { execute, ...state } = useApi("/sessions");

  const login = useCallback(
    async (email, password) => {
      const result = await execute("/sessions", {
        method: "POST",
        data: { email, password },
      });

      if (result?.data?.accessToken) {
        setAccessToken(result.data.accessToken);
      }

      return result;
    },
    [execute],
  );

  return { login, ...state };
};

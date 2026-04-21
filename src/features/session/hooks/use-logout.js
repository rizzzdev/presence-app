import { useCallback } from "react";
import useApi from "./use-api";

/**
 * Hook untuk logout
 */
export const useLogout = () => {
  const { execute } = useApi(`/sessions/`);

  const logout = useCallback(
    async (id) => {
      const response = await execute(`/sessions/${id}`, { method: "DELETE" });
      // Token sudah di-clear oleh interceptor

      return response;
    },

    [execute],
  );

  return { logout };
};

import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    const { sessionId, exp } = jwtDecode(token);

    const NOW = new Date().getTime();
    const isValid = exp * 1000 >= NOW;

    if (!isValid) {
      return null;
    }

    return sessionId;
  } catch (error) {
    return null;
  }
};

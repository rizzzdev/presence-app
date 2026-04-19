import { axiosIns } from "~/libs/axios-ins";

export const postAccessToken = async () => {
  try {
    const response = await axiosIns.post("/access-token");

    return response.data.data;
  } catch {
    return null;
  }
};

import { axiosIns } from "~/libs/axios-ins";

export const getTeacherById = async (id, query = "", accessToken) => {
  try {
    const response = await axiosIns.get(`/teachers/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

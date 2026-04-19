import { axiosIns } from "~/libs/axios-ins";

export const getSessionById = async (id, query = "", accessToken) => {
  try {
    const response = await axiosIns.get(`/sessions/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postSession = async (sessionData) => {
  try {
    const response = await axiosIns.post("/sessions", sessionData);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteSessionById = async (id, accessToken) => {
  try {
    const response = await axiosIns.delete(`/sessions/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

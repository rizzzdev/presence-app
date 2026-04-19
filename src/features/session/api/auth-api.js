export const getAuthById = async (id, query = "", accessToken) => {
  try {
    const response = await axiosIns.get(`/auths/${id}?${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

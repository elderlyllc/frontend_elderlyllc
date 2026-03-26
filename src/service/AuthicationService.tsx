import api from "../library/axios";
import apiEndpoints from "../service/common";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post(apiEndpoints.login, {
      email,
      password
    });

    return response.data; // Axios already parses JSON
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Login failed"
    );
  }
};
import api from "../library/axios";
import apiEndpoints from "./common";

export const subscriptionList = async () => {
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


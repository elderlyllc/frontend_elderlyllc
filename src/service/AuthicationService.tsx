import api from "../library/axios";
import apiEndpoints from "./Common";

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


export const registerUser = async (fullName: string, email: string, password: string) => {
  try {
    const response = await api.post(apiEndpoints.register, {
      fullName,
      email,
      password
    });

    return response.data; // Axios already parses JSON
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Registration failed"
    );
  }
};

export const updateUserDetails = async (id: number, payload: any) => {
  try {
    const response = await api.put(apiEndpoints.updateUserDetails(id), payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update user details"
    );
  }
};
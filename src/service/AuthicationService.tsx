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

export const getProfile = async (id: number) => {
  try {
    const response = await api.get(apiEndpoints.getProfile(id));
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch profile"
    );
  }
};



export const sendOtp = async (email: string) => {
  try {
    const response = await api.post(apiEndpoints.sendOtp, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to send OTP"
    );
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await api.post(apiEndpoints.verifyOtp, { email, otp });
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to verify OTP"
    );
  }
};

export const getUpcomingServices = async () => {
  try {
    const response = await api.get(apiEndpoints.getUpcomingServices);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to fetch upcoming services"
    );
  }
};
import api from "../library/axios";
import apiEndpoints from "./Common";

export const createPaymentIntent = async (amount: number) => {
  const response = await api.post(apiEndpoints.createPaymentIntent, {
    amount,
  });

  return response.data;
};

export const savePaymentStatus = async (payload: any) => {
  try {
    const response = await api.post(apiEndpoints.savePaymentStatus, payload);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to save payment status"
    );
  }
};
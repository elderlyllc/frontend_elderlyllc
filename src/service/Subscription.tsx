import api from "../library/axios";
import apiEndpoints from "./Common";

export const subscriptionList = async () => {
  try {
    const response = await api.get(apiEndpoints.subscriptionList);

    return response.data; // Axios already parses JSON
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || error.response?.data?.message || "Failed to fetch subscriptions"
    );
  }
};


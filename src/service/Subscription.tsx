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



export const custmersubscriptionlist = async () => {
  try {
    const response = await api.get(apiEndpoints.getPincodeMapping);

    return response.data; // Axios already parses JSON
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || error.response?.data?.message || "Failed to fetch subscriptions"
    );
  }
};

export const getMappedUsers = async (managerId: number) => {
  try {
    const response = await api.get(apiEndpoints.getMappedUsers(managerId));
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error || error.response?.data?.message || "Failed to fetch mapped users"
    );
  }
};

import api from "../library/axios";
import apiEndpoints from "./Common";

/**
 * Add Cart
 */
export const addCart = async (payload: any) => {
  try {
    const response = await api.post(apiEndpoints.addtocart, payload);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to add cart"
    );
  }
};

/**
 * Fetch All Carts
 */
export const fetchCart = async () => {
  try {
    const response = await api.get(apiEndpoints.getcart);

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to fetch cart"
    );
  }
};

/**
 * Fetch Cart Details by ID
 */
export const fetchCartDetails = async (id: number) => {
  try {
    const response = await api.get(
      apiEndpoints.getCartDetails(id)
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Failed to fetch cart details"
    );
  }
};
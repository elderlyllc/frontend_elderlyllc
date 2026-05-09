import api from "../library/axios";
import apiEndpoints from "./Common";

export const getNotifications = async (userId: number) => {
  try {
    const response = await api.get(apiEndpoints.getNotifications(userId));
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to fetch notifications"
    );
  }
};

export const createNotification = async (payload: any) => {
  try {
    const response = await api.post(apiEndpoints.createNotification, payload);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to create notification"
    );
  }
};

export const markNotificationRead = async (id: number) => {
  try {
    const response = await api.patch(apiEndpoints.markNotificationRead(id));
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to mark notification as read"
    );
  }
};

export const markAllNotificationsRead = async (userId: number) => {
  try {
    const response = await api.patch(
      apiEndpoints.markAllNotificationsRead(userId)
    );
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to mark all notifications as read"
    );
  }
};

export const deleteNotification = async (id: number) => {
  try {
    const response = await api.delete(apiEndpoints.deleteNotification(id));
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to delete notification"
    );
  }
};
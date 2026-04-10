import axios from "axios";
import apiEndpoints  from "../service/Common";

const api = axios.create({
  baseURL: apiEndpoints.baseURL
});

// Function to send error logs to backend
const sendErrorToBackend = async (errorData: any) => {
  try {
    await axios.post(`${apiEndpoints.baseURL}/api/error-logs`, errorData);
  } catch (err) {
    console.error("Failed to send error log:", err);
  }
};

// request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    const errorData = {
      type: "request_error",
      message: error.message,
      timestamp: new Date().toISOString(),
      url: error.config?.url,
    };
    sendErrorToBackend(errorData);
    return Promise.reject(error);
  }
);

// response interceptor (global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData: any = {
      type: "response_error",
      timestamp: new Date().toISOString(),
      url: error.config?.url,
      message: error.message,
      status: undefined,
      data: undefined,
    };

    if (error.response) {
      const status = error.response.status;
      errorData.status = status;
      errorData.data = error.response.data;

      if (status === 401) {
        console.log("Session expired. Please login again.");
        localStorage.removeItem("token");
       // window.location.href = "/login";
      }

      if (status === 500) {
        alert("Server error. Try again later.");
      }
    } else {
      errorData.type = "network_error";
      alert("Network error. Check internet connection.");
    }

    // Send error to backend
    sendErrorToBackend(errorData);

    return Promise.reject(error);
  }
);

export default api;
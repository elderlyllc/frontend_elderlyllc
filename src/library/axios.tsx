import axios from "axios";
import apiEndpoints  from "../service/common";

const api = axios.create({
  baseURL: apiEndpoints.baseURL
});

// request interceptor (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor (global error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      if (status === 500) {
        alert("Server error. Try again later.");
      }

    } else {
      alert("Network error. Check internet connection.");
    }

    return Promise.reject(error);
  }
);

export default api;
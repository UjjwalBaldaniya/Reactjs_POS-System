import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("🚀 ~ error:", error);
    if (error?.response) {
      toast.error(error?.response?.data?.msg);
    } else {
      // Handle other errors
      Promise.reject(error);
    }
  }
);

export default axiosInstance;

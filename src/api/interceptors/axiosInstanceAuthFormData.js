import axios from "axios";

const axiosInstanceAuthFormData = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
});

axiosInstanceAuthFormData.interceptors.request.use(
  async (config) => {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      config.headers = {
        Authorization: `Bearer ${authToken}`,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceAuthFormData.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstanceAuthFormData;

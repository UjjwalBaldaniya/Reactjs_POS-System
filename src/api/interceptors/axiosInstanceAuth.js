import axios from "axios";

const axiosInstanceAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  Accept: "application/json",
  "Content-Type": "application/json",
});

axiosInstanceAuth.interceptors.request.use(
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

axiosInstanceAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstanceAuth;

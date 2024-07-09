import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";

const handleSuccess = (response) => {
  toast.success(response?.data?.msg);
  return response?.data;
};

const handleError = (error) => {
  const errorMessage =
    error?.response?.data?.msg || "An unexpected error occurred";
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

const request = async (method, url, data = null) => {
  try {
    const response = await axiosInstanceAuth({ method, url, data });
    return method === "get" ? response?.data : handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

const apiService = {
  get: (url) => request("get", url),
  post: (url, data) => request("post", url, data),
  patch: (url, data) => request("patch", url, data),
  delete: (url) => request("delete", url),
};

export default apiService;

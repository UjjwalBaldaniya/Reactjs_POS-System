import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";
import { DELETE, GET, PATCH, POST } from "../../utils/constants";

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
    return method === GET ? response?.data : handleSuccess(response);
  } catch (error) {
    return handleError(error);
  }
};

const apiService = {
  get: (url) => request(GET, url),
  post: (url, data) => request(POST, url, data),
  patch: (url, data) => request(PATCH, url, data),
  delete: (url, data) => request(DELETE, url, data),
};

export default apiService;

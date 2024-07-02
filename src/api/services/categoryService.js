import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";

export const addCategory = async (value) => {
  try {
    const response = await axiosInstanceAuth.post("/category/add", value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getCategory = async () => {
  try {
    const response = await axiosInstanceAuth.get("/category");
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getByIdCategory = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/category/${id}`);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const editCategory = async (id, value) => {
  try {
    const response = await axiosInstanceAuth.post(`/category/${id}`, value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstanceAuth.delete(`/category/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

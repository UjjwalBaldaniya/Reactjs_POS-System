import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";

export const addVariation = async (value) => {
  try {
    const response = await axiosInstanceAuth.post("/variation/add", value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getVariations = async () => {
  try {
    const response = await axiosInstanceAuth.get("/variation");
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getByIdVariation = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/variation/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const editVariation = async (id, value) => {
  try {
    const response = await axiosInstanceAuth.post(`/variation/${id}`, value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const deleteVariation = async (id) => {
  try {
    const response = await axiosInstanceAuth.delete(`/variation/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";

export const addUnit = async (value) => {
  try {
    const response = await axiosInstanceAuth.post("/unit/add", value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getUnits = async () => {
  try {
    const response = await axiosInstanceAuth.get("/unit");
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getByIdUnit = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/unit/${id}`);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const editUnit = async (id, value) => {
  try {
    const response = await axiosInstanceAuth.post(`/unit/${id}`, value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const deleteUnit = async (id) => {
  try {
    const response = await axiosInstanceAuth.delete(`/unit/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

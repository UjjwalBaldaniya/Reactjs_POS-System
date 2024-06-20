import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";

export const addBaseUnit = async (value) => {
  try {
    const response = await axiosInstanceAuth.post("/baseunit/add", value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getBaseUnits = async () => {
  try {
    const response = await axiosInstanceAuth.get("/baseunit");
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getByIdBaseUnits = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/baseunit/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const editBaseUnit = async (id, value) => {
  try {
    const response = await axiosInstanceAuth.post(`/baseunit/${id}`, value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const deleteBaseUnit = async (id) => {
  try {
    const response = await axiosInstanceAuth.delete(`/baseunit/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

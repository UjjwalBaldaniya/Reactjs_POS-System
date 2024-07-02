import { toast } from "react-toastify";
import axiosInstanceAuth from "../interceptors/axiosInstanceAuth";

export const addProduct = async (value) => {
  try {
    const response = await axiosInstanceAuth.post("/product/add", value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getProducts = async () => {
  try {
    const response = await axiosInstanceAuth.get("/product");
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const getByIdProduct = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/product/${id}`);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const editProduct = async (id, value) => {
  try {
    const response = await axiosInstanceAuth.post(`/product/${id}`, value);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstanceAuth.delete(`/product/${id}`);
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

export const deleteProductImage = async (id, imageId) => {
  try {
    const response = await axiosInstanceAuth.delete(`/product/image/${id}`, {
      data: imageId,
    });
    toast.success(response?.data?.msg);
    return response?.data;
  } catch (error) {
    return null;
  }
};

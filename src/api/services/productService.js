import apiService from "./apiService";

export const addProduct = async (value) => {
  return await apiService.post("/product/add", value);
};

export const getProducts = async () => {
  return await apiService.get("/product");
};

export const getByIdProduct = async (id) => {
  return await apiService.get(`/product/${id}`);
};

export const editProduct = async (id, value) => {
  return await apiService.post(`/product/${id}`, value);
};

export const deleteProduct = async (id) => {
  return await apiService.delete(`/product/${id}`);
};

export const deleteProductImage = async (id, imageId) => {
  return await apiService.delete(`/product/image/${id}`, imageId);
};

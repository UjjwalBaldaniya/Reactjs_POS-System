import apiService from "./apiService";

export const addCategory = async (value) => {
  return await apiService.post("/category/add", value);
};

export const getCategory = async () => {
  return await apiService.get("/category");
};

export const getByIdCategory = async (id) => {
  return await apiService.get(`/category/${id}`);
};

export const editCategory = async (id, value) => {
  return await apiService.post(`/category/${id}`, value);
};

export const deleteCategory = async (id) => {
  return await apiService.delete(`/category/${id}`);
};

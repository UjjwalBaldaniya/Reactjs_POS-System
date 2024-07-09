import apiService from "./apiService";

export const addSupplier = async (value) => {
  return await apiService.post("/suppliers/add", value);
};

export const getSuppliers = async () => {
  return await apiService.get("/suppliers");
};

export const getByIdSupplier = async (id) => {
  return await apiService.get(`/suppliers/${id}`);
};

export const editSupplier = async (id, value) => {
  return await apiService.patch(`/suppliers/${id}`, value);
};

export const deleteSupplier = async (id) => {
  return await apiService.delete(`/suppliers/${id}`);
};

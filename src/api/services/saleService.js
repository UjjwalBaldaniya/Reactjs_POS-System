import apiService from "./apiService";

export const addSale = async (value) => {
  return await apiService.post("/sales/add", value);
};

export const getSales = async () => {
  return await apiService.get("/sales");
};

export const getByIdSale = async (id) => {
  return await apiService.get(`/sales/${id}`);
};

export const editSale = async (id, value) => {
  return await apiService.patch(`/sales/${id}`, value);
};

export const deleteSale = async (id) => {
  return await apiService.delete(`/sales/${id}`);
};

export const deleteSaleByName = async (id, value) => {
  return await apiService.delete(`/sales/productitem/${id}`, value);
};

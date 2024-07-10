import apiService from "./apiService";

export const getProductByName = async () => {
  return await apiService.get("/product/productby/name");
};

export const addPurchase = async (value) => {
  return await apiService.post("/purchase/add", value);
};

export const getPurchase = async () => {
  return await apiService.get("/purchase");
};

export const getByIdPurchase = async (id) => {
  return await apiService.get(`/purchase/${id}`);
};

export const editPurchase = async (id, value) => {
  return await apiService.patch(`/purchase/${id}`, value);
};

export const deletePurchase = async (id) => {
  return await apiService.delete(`/purchase/${id}`);
};

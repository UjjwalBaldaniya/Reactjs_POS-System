import apiService from "./apiService";

export const addPurchaseReturn = async (value) => {
  return await apiService.post("/purchasereturn/add", value);
};

export const getPurchaseReturn = async () => {
  return await apiService.get("/purchasereturn");
};

export const editPurchaseReturn = async (id, value) => {
  return await apiService.patch(`/purchasereturn/${id}`, value);
};

export const deletePurchaseReturn = async (id) => {
  return await apiService.delete(`/purchasereturn/${id}`);
};

export const deletePurchaseReturnByName = async (id, value) => {
  return await apiService.delete(`/purchasereturn/productitem/${id}`, value);
};

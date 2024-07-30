import apiService from "./apiService";

export const addPurchaseReturn = async (value) => {
  return await apiService.post("/purchasereturn/add", value);
};

export const getPurchaseReturn = async () => {
  return await apiService.get("/purchasereturn");
};

// export const getByIdPurchaseReturn = async (id) => {
//   return await apiService.get(`/purchase/${id}`);
// };

// export const editPurchaseReturn = async (id, value) => {
//   return await apiService.patch(`/purchase/${id}`, value);
// };

// export const deletePurchaseReturn = async (id) => {
//   return await apiService.delete(`/purchase/${id}`);
// };

// export const deletePurchaseReturnByName = async (id, value) => {
//   return await apiService.delete(`/purchase/productitem/${id}`, value);
// };

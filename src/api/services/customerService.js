import apiService from "./apiService";

export const addCustomer = async (value) => {
  return await apiService.post("/customers/add", value);
};

export const getCustomers = async () => {
  return await apiService.get("/customers");
};

export const getByIdCustomer = async (id) => {
  return await apiService.get(`/customers/${id}`);
};

export const editCustomer = async (id, value) => {
  return await apiService.patch(`/customers/${id}`, value);
};

export const deleteCustomer = async (id) => {
  return await apiService.delete(`/customers/${id}`);
};

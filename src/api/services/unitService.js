import apiService from "./apiService";

export const addUnit = async (value) => {
  return await apiService.post("/unit/add", value);
};

export const getUnits = async () => {
  return await apiService.get("/unit");
};

export const getByIdUnit = async (id) => {
  return await apiService.get(`/unit/${id}`);
};

export const editUnit = async (id, value) => {
  return await apiService.post(`/unit/${id}`, value);
};

export const deleteUnit = async (id) => {
  return await apiService.delete(`/unit/${id}`);
};

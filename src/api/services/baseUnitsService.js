import apiService from "./apiService";

export const addBaseUnit = async (value) => {
  return await apiService.post("/baseunit/add", value);
};

export const getBaseUnits = async () => {
  return await apiService.get("/baseunit");
};

export const getByIdBaseUnits = async (id) => {
  return await apiService.get(`/baseunit/${id}`);
};

export const editBaseUnit = async (id, value) => {
  return await apiService.post(`/baseunit/${id}`, value);
};

export const deleteBaseUnit = async (id) => {
  return await apiService.delete(`/baseunit/${id}`);
};

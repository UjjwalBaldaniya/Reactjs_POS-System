import apiService from "./apiService";

export const addVariation = async (value) => {
  return await apiService.post("/variation/add", value);
};

export const getVariations = async () => {
  return await apiService.get("/variation");
};

export const getByIdVariation = async (id) => {
  return await apiService.get(`/variation/${id}`);
};

export const editVariation = async (id, value) => {
  return await apiService.post(`/variation/${id}`, value);
};

export const deleteVariation = async (id) => {
  return await apiService.delete(`/variation/${id}`);
};

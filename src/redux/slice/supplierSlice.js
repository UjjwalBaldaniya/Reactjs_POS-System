import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getByIdSupplier,
  getSuppliers,
} from "../../api/services/supplierService";

export const fetchSuppliers = createAsyncThunk(
  "supplier/fetchSuppliers",
  async () => {
    const response = await getSuppliers();
    return response?.data;
  }
);

export const fetchSupplierById = createAsyncThunk(
  "supplier/fetchSupplierById",
  async (id) => {
    const response = await getByIdSupplier(id);
    return response?.data;
  }
);

const supplierSlice = createSlice({
  name: "supplier",
  initialState: {
    suppliersData: [],
    supplierDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetInitialValues: (state) => {
      state.supplierDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suppliersData = action?.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(fetchSupplierById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSupplierById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.supplierDataById = action?.payload;
      })
      .addCase(fetchSupplierById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const { resetInitialValues, setEdit } = supplierSlice.actions;
export default supplierSlice.reducer;

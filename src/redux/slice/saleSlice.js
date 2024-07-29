import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getByIdSale, getSales } from "../../api/services/saleService";

export const fetchSales = createAsyncThunk("sale/fetchSales", async () => {
  const response = await getSales();
  return response?.data;
});

export const fetchSaleById = createAsyncThunk(
  "sale/fetchSaleById",
  async (id) => {
    const response = await getByIdSale(id);
    return response?.data;
  }
);

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    salesData: [],
    saleDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetInitialValues: (state) => {
      state.saleDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.salesData = action?.payload;
      })
      .addCase(fetchSales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(fetchSaleById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.saleDataById = action?.payload;
      })
      .addCase(fetchSaleById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const { resetInitialValues, setEdit } = saleSlice.actions;
export default saleSlice.reducer;

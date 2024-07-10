import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getByIdPurchase,
  getProductByName,
  getPurchase,
} from "../../api/services/purchaseService";

export const fetchProductByName = createAsyncThunk(
  "purchase/fetchProductByName",
  async () => {
    const response = await getProductByName();
    return response?.data;
  }
);

export const fetchPurchase = createAsyncThunk(
  "purchase/fetchPurchase",
  async () => {
    const response = await getPurchase();
    return response?.data;
  }
);

export const fetchPurchaseById = createAsyncThunk(
  "purchase/fetchPurchaseById",
  async (id) => {
    const response = await getByIdPurchase(id);
    return response?.data;
  }
);

const purchaseSlice = createSlice({
  name: "products",
  initialState: {
    productByNameData: [],
    purchaseData: [],
    supplierDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetInitialValues: (state, action) => {
      state.supplierDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductByName.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productByNameData = action?.payload;
      })
      .addCase(fetchProductByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(fetchPurchase.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPurchase.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.purchaseData = action?.payload;
      })
      .addCase(fetchPurchase.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(fetchPurchaseById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPurchaseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.supplierDataById = action?.payload;
      })
      .addCase(fetchPurchaseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const { resetInitialValues, setEdit } = purchaseSlice.actions;
export default purchaseSlice.reducer;

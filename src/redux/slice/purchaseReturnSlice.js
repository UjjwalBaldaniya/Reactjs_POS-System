import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPurchaseReturn } from "../../api/services/purchaseReturnService";

export const fetchPurchaseReturn = createAsyncThunk(
  "purchaseReturn/fetchPurchaseReturn",
  async () => {
    const response = await getPurchaseReturn();
    return response?.data;
  }
);

const purchaseReturnSlice = createSlice({
  name: "purchase-return",
  initialState: {
    purchaseReturnData: [],
    purchaseReturnDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetInitialValues: (state) => {
      state.purchaseReturnDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPurchaseReturn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPurchaseReturn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.purchaseReturnData = action?.payload;
      })
      .addCase(fetchPurchaseReturn.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const { resetInitialValues, setEdit } = purchaseReturnSlice.actions;
export default purchaseReturnSlice.reducer;

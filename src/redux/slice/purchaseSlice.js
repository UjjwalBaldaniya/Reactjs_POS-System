import { createSlice } from "@reduxjs/toolkit";

const purchaseSlice = createSlice({
  name: "products",
  initialState: {
    productTableData: [],
    grandTotal: "",
  },
  reducers: {
    setProductTableData: (state, action) => {
      // state.grandTotal = {};
    },
    setGrandTotal: (state, action) => {
      // state.grandTotal = {};
    },
  },
});

export const { setGrandTotal } = purchaseSlice.actions;
export default purchaseSlice.reducer;

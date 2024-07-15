import { createSlice } from "@reduxjs/toolkit";

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
      state.productDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
});

export const { resetInitialValues, setEdit } = purchaseReturnSlice.actions;
export default purchaseReturnSlice.reducer;

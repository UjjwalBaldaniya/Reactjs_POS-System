import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getProductByName } from "../../api/services/purchaseService";

export const fetchFilteredProductList = createAsyncThunk(
  "pos/fetchProductByName",
  async () => {
    const response = await getProductByName();
    return response?.data;
  }
);

const posSlice = createSlice({
  name: "pos",
  initialState: {
    filteredProductList: [],
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
    setFilteredProductList: (state, action) => {
      // Need Image and category
      const { filteredProductList = [] } = current(state);
      // const newData = newFilteredProductList?.filter((data) => data?.)
      console.log("🚀 ~ clone:", filteredProductList);
      //   state.filteredProductList = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilteredProductList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchFilteredProductList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filteredProductList = action?.payload;
      })
      .addCase(fetchFilteredProductList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const { setFilteredProductList, resetInitialValues, setEdit } =
  posSlice.actions;
export default posSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByIdUnit, getUnits } from "../../api/services/unitService";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await getUnits();
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await getByIdUnit(id);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    productsData: [],
    productDataById: {},
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
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productsData = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDataById = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetInitialValues, setEdit } = productSlice.actions;
export default productSlice.reducer;

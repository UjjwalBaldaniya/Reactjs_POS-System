import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getByIdCategory,
  getCategory,
} from "../../api/services/categoryService";

export const fetchCategory = createAsyncThunk(
  "products/fetchCategory",
  async () => {
    const response = await getCategory();
    return response.data;
  }
);

export const fetchCategoryById = createAsyncThunk(
  "products/fetchCategoryById",
  async (id) => {
    const response = await getByIdCategory(id);
    return response.data;
  }
);

const unitSlice = createSlice({
  name: "products",
  initialState: {
    categoryData: [],
    categoryDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
    isModalOpen: false,
  },
  reducers: {
    resetInitialValues: (state) => {
      state.categoryDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryData = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategoryById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryDataById = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetInitialValues, setEdit, setModalOpen } = unitSlice.actions;
export default unitSlice.reducer;

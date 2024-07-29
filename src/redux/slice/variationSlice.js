import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getByIdVariation,
  getVariations,
} from "../../api/services/variationsService";

export const fetchVariations = createAsyncThunk(
  "products/fetchVariations",
  async () => {
    const response = await getVariations();
    return response.data;
  }
);

export const fetchVariationById = createAsyncThunk(
  "products/fetchVariationById",
  async (id) => {
    const response = await getByIdVariation(id);
    return response.data;
  }
);

const variationSlice = createSlice({
  name: "products",
  initialState: {
    variationData: [],
    variationDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
    isModalOpen: false,
  },
  reducers: {
    resetInitialValues: (state) => {
      state.variationDataById = {};
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
      .addCase(fetchVariations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVariations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.variationData = action.payload;
      })
      .addCase(fetchVariations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchVariationById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVariationById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.variationDataById = action.payload;
      })
      .addCase(fetchVariationById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetInitialValues, setEdit, setModalOpen } =
  variationSlice.actions;
export default variationSlice.reducer;

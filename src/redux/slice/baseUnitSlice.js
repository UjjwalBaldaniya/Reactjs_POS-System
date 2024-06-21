import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getBaseUnits,
  getByIdBaseUnits,
} from "../../api/services/baseUnitsService";

export const fetchBaseUnits = createAsyncThunk(
  "products/fetchBaseUnits",
  async () => {
    const response = await getBaseUnits();
    return response.data;
  }
);
export const fetchBaseUnitById = createAsyncThunk(
  "products/fetchBaseUnitById",
  async (id) => {
    const response = await getByIdBaseUnits(id);
    return response.data;
  }
);

const baseUnitSlice = createSlice({
  name: "products",
  initialState: {
    baseUnitsData: [],
    baseUnitDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
    isModalOpen: false,
  },
  reducers: {
    resetInitialValues: (state, action) => {
      state.baseUnitDataById = action?.payload;
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBaseUnits.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBaseUnits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.baseUnitsData = action.payload;
      })
      .addCase(fetchBaseUnits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBaseUnitById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBaseUnitById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.baseUnitDataById = action.payload;
      })
      .addCase(fetchBaseUnitById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetInitialValues, setEdit, setModalOpen } =
  baseUnitSlice.actions;
export default baseUnitSlice.reducer;

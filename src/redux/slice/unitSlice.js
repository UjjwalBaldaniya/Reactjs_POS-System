import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getByIdUnit, getUnits } from "../../api/services/unitService";

export const fetchUnits = createAsyncThunk("products/fetchUnits", async () => {
  const response = await getUnits();
  return response.data;
});

export const fetchUnitById = createAsyncThunk(
  "products/fetchUnitById",
  async (id) => {
    const response = await getByIdUnit(id);
    return response.data;
  }
);

const unitSlice = createSlice({
  name: "products",
  initialState: {
    unitsData: [],
    unitDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetInitialValues: (state, action) => {
      state.unitDataById = action?.payload;
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUnits.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.unitsData = action.payload;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchUnitById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUnitById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.unitDataById = action.payload;
      })
      .addCase(fetchUnitById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetInitialValues, setEdit } = unitSlice.actions;
export default unitSlice.reducer;

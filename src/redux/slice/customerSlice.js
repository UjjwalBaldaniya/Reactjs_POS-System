import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getByIdCustomer,
  getCustomers,
} from "../../api/services/customerService";

export const fetchCustomers = createAsyncThunk(
  "customer/fetchCustomers",
  async () => {
    const response = await getCustomers();
    return response?.data;
  }
);

export const fetchCustomerById = createAsyncThunk(
  "customer/fetchCustomerById",
  async (id) => {
    const response = await getByIdCustomer(id);
    return response?.data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customersData: [],
    customerDataById: {},
    isEdit: false,
    status: "idle",
    error: null,
  },
  reducers: {
    resetInitialValues: (state, action) => {
      state.customerDataById = {};
    },
    setEdit: (state, action) => {
      state.isEdit = action?.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customersData = action?.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      })
      .addCase(fetchCustomerById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCustomerById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerDataById = action?.payload;
      })
      .addCase(fetchCustomerById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action?.error?.message;
      });
  },
});

export const { resetInitialValues, setEdit } = customerSlice.actions;
export default customerSlice.reducer;

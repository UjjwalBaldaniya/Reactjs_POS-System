import { configureStore } from "@reduxjs/toolkit";
import baseUnitSlice from "./slice/baseUnitSlice";
import languageSlice from "./slice/languageSlice";
import unitSlice from "./slice/unitSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
    baseUnit: baseUnitSlice,
    unit: unitSlice,
  },
});

export default store;

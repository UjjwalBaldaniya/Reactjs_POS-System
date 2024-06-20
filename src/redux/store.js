import { configureStore } from "@reduxjs/toolkit";
import baseUnitSlice from "./slice/baseUnitSlice";
import languageSlice from "./slice/languageSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
    baseUnit: baseUnitSlice,
  },
});

export default store;

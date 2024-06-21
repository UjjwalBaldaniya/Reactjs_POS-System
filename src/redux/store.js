import { configureStore } from "@reduxjs/toolkit";
import baseUnitSlice from "./slice/baseUnitSlice";
import languageSlice from "./slice/languageSlice";
import unitSlice from "./slice/unitSlice";
import variationSlice from "./slice/variationSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
    baseUnit: baseUnitSlice,
    unit: unitSlice,
    variation: variationSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import baseUnitSlice from "./slice/baseUnitSlice";
import categorySlice from "./slice/categorySlice";
import languageSlice from "./slice/languageSlice";
import productSlice from "./slice/product.slice";
import unitSlice from "./slice/unitSlice";
import variationSlice from "./slice/variationSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
    baseUnit: baseUnitSlice,
    unit: unitSlice,
    variation: variationSlice,
    category: categorySlice,
    product: productSlice,
  },
});

export default store;

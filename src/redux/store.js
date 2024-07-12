import { configureStore } from "@reduxjs/toolkit";
import baseUnitSlice from "./slice/baseUnitSlice";
import categorySlice from "./slice/categorySlice";
import languageSlice from "./slice/languageSlice";
import productSlice from "./slice/product.slice";
import unitSlice from "./slice/unitSlice";
import variationSlice from "./slice/variationSlice";
import purchaseSlice from "./slice/purchaseSlice";
import supplierSlice from "./slice/supplierSlice";
import customerSlice from "./slice/customerSlice";
import saleSlice from "./slice/saleSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
    baseUnit: baseUnitSlice,
    unit: unitSlice,
    variation: variationSlice,
    category: categorySlice,
    product: productSlice,
    purchase: purchaseSlice,
    supplier: supplierSlice,
    customer: customerSlice,
    sale: saleSlice,
  },
});

export default store;

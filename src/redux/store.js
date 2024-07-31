import { configureStore } from "@reduxjs/toolkit";

import baseUnitSlice from "./slice/baseUnitSlice";
import categorySlice from "./slice/categorySlice";
import customerSlice from "./slice/customerSlice";
import languageSlice from "./slice/languageSlice";
import posSlice from "./slice/posSlice";
import productSlice from "./slice/product.slice";
import purchaseReturnSlice from "./slice/purchaseReturnSlice";
import purchaseSlice from "./slice/purchaseSlice";
import saleSlice from "./slice/saleSlice";
import supplierSlice from "./slice/supplierSlice";
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
    purchase: purchaseSlice,
    purchaseReturn: purchaseReturnSlice,
    supplier: supplierSlice,
    customer: customerSlice,
    sale: saleSlice,
    pos: posSlice,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import languageSlice from "./slice/languageSlice";

const store = configureStore({
  reducer: {
    language: languageSlice,
  },
});

export default store;

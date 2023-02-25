import { configureStore } from "@reduxjs/toolkit";
import { voidApi } from "./apis/void";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [voidApi.reducerPath]: voidApi.reducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(voidApi.middleware),
});
setupListeners(store.dispatch);

import { configureStore } from "@reduxjs/toolkit";
import controlledForm from "./slices/controlledFormSlice";

export const store = configureStore({
  reducer: {
    controlledForm,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

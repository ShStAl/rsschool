import { configureStore } from "@reduxjs/toolkit";
import controlledForm from "./slices/controlledFormSlice";
import uncontrolledForm from "./slices/uncontrolledFormSlice";

export const store = configureStore({
  reducer: {
    controlledForm,
    uncontrolledForm,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

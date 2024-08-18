import { configureStore } from "@reduxjs/toolkit";
import controlledForm from "./slices/controlledFormSlice";
import uncontrolledForm from "./slices/uncontrolledFormSlice";
import countries from "./slices/countriesSlice";

export const store = configureStore({
  reducer: {
    controlledForm,
    uncontrolledForm,
    countries,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

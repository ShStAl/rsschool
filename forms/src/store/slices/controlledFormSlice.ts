import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../../types/form.ts";

const initialState: IFormData = {
  name: "",
  age: 0,
  email: "",
  password: "",
  gender: "",
  image: "",
  country: "",
};

export const controlledFormSlice = createSlice({
  name: "controlledForm",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormData>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setForm } = controlledFormSlice.actions;
export default controlledFormSlice.reducer;

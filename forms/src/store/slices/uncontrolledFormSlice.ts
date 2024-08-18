import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../../types/form.ts";

const initialState: IFormData = {
  name: "",
  age: null,
  email: "",
  password: "",
  gender: "",
  image: "",
  country: "",
};

export const uncontrolledFormSlice = createSlice({
  name: "uncontrolledForm",
  initialState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormData>) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.gender = action.payload.gender;
      state.image = action.payload.image;
      state.country = action.payload.country;
    },
  },
});

export const { setForm } = uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;

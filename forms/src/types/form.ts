export interface IRawFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: "male" | "female" | "other";
  terms: boolean;
  image: File;
  country: string;
}

export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  image: string;
  country: string;
}

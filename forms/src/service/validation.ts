import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Z][a-zA-Z]*$/, "Name must start with an uppercase letter")
    .required("Name is required"),
  age: Yup.number()
    .typeError("Age is required")
    .min(0, "Age cannot be negative")
    .required("Age is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match",
  ),
  gender: Yup.string().required("Gender is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions",
  ),
  image: Yup.mixed<FileList>()
    .required("Picture is required")
    .test(
      "fileType",
      "Unsupported File Format. Allowed formats: png, jpeg",
      (file) => {
        if (!file) return true;
        const allowedFormats = ["image/jpeg", "image/png"];
        return file && allowedFormats.includes(file[0]?.type);
      },
    )
    .test("fileSize", "File too large. Max size is 2MB", (file) => {
      if (!file) return true;
      const maxSize = 2 * 1024 * 1024; // 2MB
      return file && file[0]?.size <= maxSize;
    }),
  country: Yup.string().required("Country is required"),
});

export default schema;

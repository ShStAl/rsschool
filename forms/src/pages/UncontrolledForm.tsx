import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import schema from "../service/validation.ts";
import { convertBase64 } from "../helpers/base64.ts";
import { setForm } from "../store/slices/uncontrolledFormSlice.ts";
import { useRef, useState } from "react";
import { RootState } from "../store/store.ts";
import PasswordStrength from "../components/PasswordStrength.tsx";

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries } = useSelector((state: RootState) => state.countries);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      age: ageRef.current?.value ? parseInt(ageRef.current?.value) : null,
      password: passwordRef.current?.value,
      passwordConfirm: passwordConfirmRef.current?.value,
      gender: genderRef.current?.value,
      image: imageRef.current?.files,
      country: countryRef.current?.value,
      terms: termsRef.current?.checked,
    };
    try {
      await schema.validate(rawData, { abortEarly: false });
      setErrors({});
      if (rawData.image && rawData.image.length > 0) {
        const image = await convertBase64(rawData.image[0]);
        const data = {
          name: rawData.name,
          age: rawData.age,
          email: rawData.email,
          password: rawData.password,
          gender: rawData.gender,
          image,
          country: rawData.country,
        };
        dispatch(setForm(data));
        navigate("/", { state: { highlight: "uncontrolled" } });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <section className="max-w-4xl p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Uncontrolled Form
        </h2>
        <NavLink to="/" className="text-gray-400">
          Back
        </NavLink>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              ref={nameRef}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mb-[-20px]">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              ref={ageRef}
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mb-[-20px]">{errors.age}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              ref={emailRef}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mb-[-20px]">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            <PasswordStrength password={passwordRef.current?.value || ""} />
            {errors.password && (
              <p className="text-red-500 text-sm mb-[-20px]">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="passwordConfirm">
              Password Confirmation
            </label>
            <input
              ref={passwordConfirmRef}
              id="passwordConfirm"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm mb-[-20px]">
                {errors.passwordConfirm}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="gender">
              Gender
            </label>
            <select
              ref={genderRef}
              name="gender"
              id="gender"
              className="w-full py-2 block px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm mb-[-20px]">{errors.gender}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="country">
              Country
            </label>
            <select
              ref={countryRef}
              name="country"
              id="country"
              className="w-full py-2 block px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mb-[-20px]">
                {errors.country}
              </p>
            )}
          </div>

          <div className="col-span-2">
            <label htmlFor="image" className="text-gray-700">
              Image
            </label>
            <input
              ref={imageRef}
              type="file"
              name="image"
              className="block w-full px-4 py-2 mt-2 text-gray-700 text-sm bg-white border border-gray-200 rounded-md file:bg-gray-200 file:text-gray-700 file:px-4 file:py-1 file:border-none file:rounded-full placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mb-[-20px]">{errors.image}</p>
            )}
          </div>

          <div className="col-span-2 mt-4">
            <div className="flex gap-2">
              <input
                ref={termsRef}
                id="tc"
                type="checkbox"
                className="w-4 ml-3"
              />
              <label className="text-gray-700" htmlFor="tc">
                Accept Terms and Conditions
              </label>
            </div>
            {errors.terms && (
              <p className="col-span-2 ml-3 text-red-500 text-sm mb-[-20px]">
                {errors.terms}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default UncontrolledForm;

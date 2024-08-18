import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import schema from "../service/validation.ts";
import { useDispatch } from "react-redux";
import { setForm } from "../store/slices/controlledFormSlice.ts";

function ControlledForm() {
  const dispatch = useDispatch();

  function convertBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result && typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert file to base64 string"));
        }
        reader.onerror = (error) => {
          reject(error);
        };
      };
    });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (rawData: Yup.InferType<typeof schema>) => {
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
  };

  return (
    <section className="max-w-4xl p-6 bg-white rounded-md shadow-md">
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Controlled Form
        </h2>
        <NavLink to="/" className="text-gray-400">
          Back
        </NavLink>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              {...register("age")}
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.age && <p>{errors.age.message}</p>}
          </div>

          <div className="col-span-2">
            <label className="text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label className="text-gray-700" htmlFor="passwordConfirm">
              Password Confirmation
            </label>
            <input
              {...register("passwordConfirm")}
              id="passwordConfirm"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
            {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="gender">
              Gender
            </label>
            <select
              {...register("gender")}
              name="gender"
              id="gender"
              className="w-full py-2 block px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p>{errors.gender.message}</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="country">
              Country
            </label>
            <select
              {...register("country")}
              name="country"
              id="country"
              className="w-full py-2 block px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="">Select Country</option>
              <option value="Argentina">Argentina</option>
              <option value="Russia">Russia</option>
              <option value="Other">Other</option>
            </select>
            {errors.country && <p>{errors.country.message}</p>}
          </div>

          <div className="col-span-2">
            <label htmlFor="image" className="text-gray-700">
              Image
            </label>
            <input
              {...register("image")}
              type="file"
              name="image"
              className="block w-full px-4 py-2 mt-2 text-gray-700 text-sm bg-white border border-gray-200 rounded-md file:bg-gray-200 file:text-gray-700 file:px-4 file:py-1 file:border-none file:rounded-full placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
            {errors.image && <p>{errors.image.message}</p>}
          </div>

          <div className="col-span-2 flex gap-2">
            <input
              {...register("terms")}
              id="tc"
              type="checkbox"
              className="w-4 ml-3"
            />
            <label className="text-gray-700" htmlFor="tc">
              Accept Terms and Conditions
            </label>
          </div>
          {errors.terms && <p className="col-span-2">{errors.terms.message}</p>}
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default ControlledForm;

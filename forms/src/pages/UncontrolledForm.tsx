import { NavLink } from "react-router-dom";

function UncontrolledForm() {
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

      <form>
        <div className="grid grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-700" htmlFor="age">
              Age
            </label>
            <input
              id="age"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div className="col-span-2">
            <label className="text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div>
            <label className="text-gray-700" htmlFor="passwordConfirmation">
              Password Confirmation
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="gender">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              className="w-full py-2 block px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700" htmlFor="country">
              Country
            </label>
            <select
              name="country"
              id="country"
              className="w-full py-2 block px-4 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
            >
              <option value="">Select Country</option>
              <option value="male">Argentina</option>
              <option value="female">Russia</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-span-2">
            <label htmlFor="image" className="text-gray-700">
              Image
            </label>
            <input
              type="file"
              name="image"
              className="block w-full px-4 py-2 mt-2 text-gray-700 text-sm bg-white border border-gray-200 rounded-md file:bg-gray-200 file:text-gray-700 file:px-4 file:py-1 file:border-none file:rounded-full placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            />
          </div>

          <div className="col-span-2 flex gap-2">
            <input id="tc" type="checkbox" className="w-4 ml-3" />
            <label className="text-gray-700" htmlFor="tc">
              Accept Terms and Conditions
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default UncontrolledForm;

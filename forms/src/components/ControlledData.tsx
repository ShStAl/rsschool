import { useSelector } from "react-redux";
import { RootState } from "../store/store.ts";

function ControlledData({ highlighted }: { highlighted: string | null }) {
  const data = useSelector((state: RootState) => state.controlledForm);
  return (
    <div
      className={`w-96 h-96 px-6 py-3 bg-white rounded-md shadow-md transition duration-300 ${highlighted === "controlled" ? "bg-lime-200" : ""}`}
    >
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-5">
          <img
            src={data.image}
            alt="Image"
            className="h-24 w-36 rounded-lg object-cover"
          />
          <div className="text-gray-700 text-xl">
            {data.name && <p>{data.name},</p>}
            {data.age && <p>{data.age} years</p>}
          </div>
        </div>

        <div>
          <h3 className="text-gray-500">Email</h3>
          <p>{data.email}</p>
        </div>

        <div>
          <h3 className="text-gray-500">Password</h3>
          <p>{data.password}</p>
        </div>

        <div>
          <h3 className="text-gray-500">Gender</h3>
          <p>{data.gender}</p>
        </div>

        <div>
          <h3 className="text-gray-500">Country</h3>
          <p>{data.country}</p>
        </div>
      </div>
    </div>
  );
}

export default ControlledData;

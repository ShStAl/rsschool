import { NavLink } from "react-router-dom";
import ControlledData from "../components/ControlledData.tsx";
import UncontrolledData from "../components/UncontrolledData.tsx";

function Main() {
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-4 items-center">
        <NavLink className="hover:text-blue-500 transition" to="/controlled">
          Controlled
        </NavLink>
        <ControlledData />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <NavLink className="hover:text-blue-500 transition" to="/uncontrolled">
          Uncontrolled
        </NavLink>
        <UncontrolledData />
      </div>
    </div>
  );
}

export default Main;

import { NavLink } from "react-router-dom";
import ControlledData from "../components/ControlledData.tsx";

function Main() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex gap-4">
        <NavLink to="/controlled">Controlled</NavLink>
        <NavLink to="/uncontrolled">Uncontrolled</NavLink>
      </div>
      <ControlledData />
    </div>
  );
}

export default Main;

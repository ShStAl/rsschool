import { NavLink } from "react-router-dom";

function Main() {
  return (
    <div className="flex gap-4">
      <NavLink to="/uncontrolled">Uncontrolled</NavLink>
      <NavLink to="/controlled">Controlled</NavLink>
    </div>
  );
}

export default Main;

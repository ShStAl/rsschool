import { NavLink, useLocation } from "react-router-dom";
import ControlledData from "../components/ControlledData.tsx";
import UncontrolledData from "../components/UncontrolledData.tsx";
import { useEffect, useState } from "react";

function Main() {
  const location = useLocation();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    if (location.state?.highlight) {
      setHighlighted(location.state.highlight);
      const timer = setTimeout(() => setHighlighted(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-4 items-center">
        <NavLink className="hover:text-blue-500 transition" to="/controlled">
          Controlled
        </NavLink>
        <ControlledData highlighted={highlighted} />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <NavLink className="hover:text-blue-500 transition" to="/uncontrolled">
          Uncontrolled
        </NavLink>
        <UncontrolledData highlighted={highlighted} />
      </div>
    </div>
  );
}

export default Main;

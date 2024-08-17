import { Route, Routes } from "react-router-dom";
import ControlledForm from "./pages/ControlledForm.tsx";
import Main from "./pages/Main.tsx";
import UncontrolledForm from "./pages/UncontrolledForm.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/uncontrolled" element={<UncontrolledForm />} />
      <Route path="/controlled" element={<ControlledForm />} />
    </Routes>
  );
}

export default App;

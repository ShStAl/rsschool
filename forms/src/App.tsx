import { Route, Routes } from "react-router-dom";
import ControlledForm from "./pages/ControlledForm.tsx";
import Main from "./pages/Main.tsx";
import UncontrolledForm from "./pages/UncontrolledForm.tsx";
import Layout from "./components/Layout.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
        <Route path="/controlled" element={<ControlledForm />} />
      </Route>
    </Routes>
  );
}

export default App;

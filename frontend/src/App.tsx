import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/page";
import Employees from "./pages/employees/page";
import AddEmployee from "./components/employees/employee-add";
import EmployeePage from "./pages/employees/[...id]/page";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/:id" element={<EmployeePage/>} />
      </Routes>
    </>
  );
}

export default App;

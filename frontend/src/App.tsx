import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/page";
import Employees from "@/pages/employees/page";
import AddEmployee from "@/components/employees/employee-add";
import EmployeePage from "@/pages/employees/[...id]/page";
import UpdateEmployee from "@/components/employees/employee-update";
import Departments from "@/pages/departments/page";
import AddDepartment from "./components/departments/department-add";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/:id" element={<EmployeePage/>} />
        <Route path="/employees/update/:id" element={<UpdateEmployee/>} />
        <Route path="/departments" element={<Departments/>}/>
        <Route path="/departments/add" element={<AddDepartment/>}/>
      </Routes>
    </>
  );
}

export default App;

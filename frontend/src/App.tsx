import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/page";
import Employees from "@/pages/employees/page";
import AddEmployee from "@/components/employees/employee-add";
import EmployeePage from "@/pages/employees/[...id]/page";
import UpdateEmployee from "@/components/employees/employee-update";
import Departments from "@/pages/departments/page";
import AddDepartment from "./components/departments/department-add";
import DepartmentPage from "./pages/departments/[...id]/page";
import UpdateDepartment from "./components/departments/department-update";
import Attendances from "./pages/attendances/page";

import { Toaster} from "@/components/ui/sonner"
import AddNewAttendance from "./components/attendances/attendance-add";
import AttendanceDetails from "./components/attendances/attendance-details";
import UpdateAttendance from "./components/attendances/attendance-update";

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
        <Route path="/departments/:id" element={<DepartmentPage/>}/>
        <Route path="/departments/update/:id" element={<UpdateDepartment/>}/>
        <Route path="/attendances" element={<Attendances/>} />
        <Route path="/attendances/add" element={<AddNewAttendance/>} />  
        <Route path="/attendances/:id" element={<AttendanceDetails/>} />
        <Route path="/attendances/update/:id" element={<UpdateAttendance/>} />  
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

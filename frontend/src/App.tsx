import { Route, Routes } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
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
import AddNewAttendance from "./components/attendances/attendance-add";
import AttendanceDetails from "./components/attendances/attendance-details";
import UpdateAttendance from "./components/attendances/attendance-update";
import LeaveAbsences from "./pages/leave-absences/page";
import AddNewLeaveAbsence from "./components/leave-absence/leave-absence-add";
import LeaveAbsenceDetails from "./components/leave-absence/leave-absence-details";
import UpdateLeaveAbsence from "./components/leave-absence/leave-absence-update";

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
        
        <Route path="/leave-absences" element={<LeaveAbsences/>} />
        <Route path="/leave-absences/add" element={<AddNewLeaveAbsence/>}/>
        <Route path="/leave-absences/:id" element={<LeaveAbsenceDetails/>} />
        <Route path="/leave-absences/update/:id" element={<UpdateLeaveAbsence/>}/>

      </Routes>
      <Toaster />
    </>
  );
}

export default App;

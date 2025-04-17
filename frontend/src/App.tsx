import { Navigate, Route, Routes } from "react-router-dom";
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

import PerformanceReviews from "./pages/performance-reviews/page";
import AddPerformanceReview from "./components/performance-review/performance-add";
import PerformanceReviewDetails from "./components/performance-review/performance-details";
import UpdatePerformanceReview from "./components/performance-review/performance-update";

import Payrolls from "./pages/payroll/page";
import AddNewPayroll from "./components/payroll/payroll-add";
import PayrollDetails from "./components/payroll/payroll-details";
import UpdatePayroll from "./components/payroll/payroll-update";

import Projects from "./pages/projects/page";
import AddNewProject from "./components/projects/project-add";
import UpdateProject from "./components/projects/project-update";
import ProjectPage from "./pages/projects/[...id]/page";
import Login from "./pages/login/page";
import ProtectedRoute from "./services/services-protected-route";

function App() {

  const token = localStorage.getItem("token"); 
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} replace/>} />

        <Route path="/dashboard" element={ <ProtectedRoute token={token}> <Dashboard /> </ProtectedRoute> }/>

        <Route path="/employees" element={ <ProtectedRoute token={token}> <Employees /> </ProtectedRoute>} />
        <Route path="/employees/add" element={<ProtectedRoute token={token}> <AddEmployee /> </ProtectedRoute>} />
        <Route path="/employees/:id" element={<ProtectedRoute token={token}> <EmployeePage/> </ProtectedRoute>} />
        <Route path="/employees/update/:id" element={<ProtectedRoute token={token}> <UpdateEmployee/> </ProtectedRoute>} />

        <Route path="/departments" element={<ProtectedRoute token={token}> <Departments/> </ProtectedRoute>}/>
        <Route path="/departments/add" element={<ProtectedRoute token={token}> <AddDepartment/> </ProtectedRoute>}/>
        <Route path="/departments/:id" element={<ProtectedRoute token={token}> <DepartmentPage/> </ProtectedRoute>}/>
        <Route path="/departments/update/:id" element={<ProtectedRoute token={token}> <UpdateDepartment/> </ProtectedRoute>}/>

        <Route path="/attendances" element={<ProtectedRoute token={token}> <Attendances/> </ProtectedRoute>}/>
        <Route path="/attendances/add" element={<ProtectedRoute token={token}> <AddNewAttendance/> </ProtectedRoute>} />  
        <Route path="/attendances/:id" element={<ProtectedRoute token={token}> <AttendanceDetails/> </ProtectedRoute>} />
        <Route path="/attendances/update/:id" element={<ProtectedRoute token={token}> <UpdateAttendance/> </ProtectedRoute>}/> 
        
        <Route path="/leave-absences" element={<ProtectedRoute token={token}> <LeaveAbsences/> </ProtectedRoute>} />
        <Route path="/leave-absences/add" element={<ProtectedRoute token={token}> <AddNewLeaveAbsence/></ProtectedRoute>}/>
        <Route path="/leave-absences/:id" element={<ProtectedRoute token={token}> <LeaveAbsenceDetails/></ProtectedRoute>} />
        <Route path="/leave-absences/update/:id" element={<ProtectedRoute token={token}> <UpdateLeaveAbsence/> </ProtectedRoute>}/>

        <Route path="/performance-reviews" element={<ProtectedRoute token={token}> <PerformanceReviews/> </ProtectedRoute>} />
        <Route path="/performance-reviews/add" element={<ProtectedRoute token={token}> <AddPerformanceReview/> </ProtectedRoute>} />
        <Route path="/performance-reviews/:id" element={<ProtectedRoute token={token}> <PerformanceReviewDetails/> </ProtectedRoute>} />
        <Route path="/performance-reviews/update/:id" element={<UpdatePerformanceReview/>} />
        
        <Route path="/payrolls" element={<ProtectedRoute token={token}> <Payrolls/> </ProtectedRoute>} />
        <Route path="/payrolls/add" element={<ProtectedRoute token={token}> <AddNewPayroll/> </ProtectedRoute>} />
        <Route path="/payrolls/id" element={<ProtectedRoute token={token}> <PayrollDetails/> </ProtectedRoute>} />
        <Route path="/payrolls/update/:id" element={<ProtectedRoute token={token}> <UpdatePayroll/> </ProtectedRoute>} />

        <Route path="/projects" element={<ProtectedRoute token={token}> <Projects/> </ProtectedRoute>} />
        <Route path="/projects/add" element={<ProtectedRoute token={token}> <AddNewProject/></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute token={token}> <ProjectPage/> </ProtectedRoute>} />
        <Route path="/projects/update/:id" element={<ProtectedRoute token={token}> <UpdateProject/></ProtectedRoute>} />

        <Route path="/login" element={<Login/>} />

      </Routes>
      <Toaster />
    </>
  );
}

export default App;

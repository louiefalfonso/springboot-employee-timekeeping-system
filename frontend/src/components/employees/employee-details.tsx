import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";
import { Button } from "@/components/ui/button";
import { useGetEmployeeById } from "@/services/services-employee";
import { useGetAllAttendances } from "@/services/services-attendance";
import { useGetAllLeaveAbsence } from "@/services/services-leave-absence";

import EmployeeDetailsTable from "./employee-detail";
import DepartmentDetailsTable from "./employee-department";
import AttendanceRecordsTable from "./employee-attendance";
import LeaveAbsenceRecordsTable from "./employee-leave";

type Attendance = {
  id: number;
  date: string;
  status: string;
  reasonForAbsence: string;
  remarks: string;
  employee: {
    id: number;
    employeeNumber: string;
  };
};

type LeaveAbsence = {
  id: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: string;
  reasonForLeave: string;
  remarks: string;
  employee: {
    id: number;
    employeeNumber: string;
  };
};

const EmployeeDetails = () => {
  
  const { id } = useParams();
  const { data: employeeData, isLoading: isEmployeeLoading, error: employeeError } = useGetEmployeeById(id || "");
  const { data: attendanceData, isLoading: isAttendanceLoading, error: attendanceError } = useGetAllAttendances();
  const { data: leaveAbsenceData, isLoading: isLeaveAbsenceLoading, error: leaveAbsenceError } = useGetAllLeaveAbsence();

  const employeeAttendance = useMemo(() => {
    return attendanceData?.filter((attendance: Attendance) => attendance.employee.id.toString() === id);
  }, [attendanceData, id]);

  const employeeLeaveAbsence = useMemo(() => {
    return leaveAbsenceData?.filter((leaveAbsence: LeaveAbsence) => leaveAbsence.employee.id.toString() === id);
  }, [leaveAbsenceData, id]);

  if (isEmployeeLoading || isAttendanceLoading || isLeaveAbsenceLoading) {
    return <div>Loading...</div>;
  }

  if (employeeError || attendanceError || leaveAbsenceError) {
    console.error('Error details:', { employeeError, attendanceError, leaveAbsenceError });
    return <div>Error loading data. Please check the console for more details.</div>;
  }

  if (!employeeData) {
    return <div>No employee data found</div>;
  }

  return (
    <MainLayout>
      <Headers Title="Employee Details Page" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <EmployeeDetailsTable employeeData={employeeData} />
          <DepartmentDetailsTable departmentData={employeeData.department} />
          <AttendanceRecordsTable attendanceData={employeeAttendance} />
          <LeaveAbsenceRecordsTable leaveAbsenceData={employeeLeaveAbsence} />
        </div>
        <div className="flex">
          <Link to={`/employees`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Employees</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetails;

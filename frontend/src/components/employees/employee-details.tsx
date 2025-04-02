import { useParams, Link } from "react-router-dom";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useGetEmployeeById } from "@/services/services-employee";
import { useGetAllAttendances } from "@/services/services-attendance";


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

const EmployeeDetails = () => {
  // Declare state variables
  const { id } = useParams();
  const { data: employeeData, isLoading: isEmployeeLoading } = useGetEmployeeById(id || "");
  const { data: attendanceData, isLoading: isAttendanceLoading } = useGetAllAttendances();

  // Handle loading state
  if (isEmployeeLoading || isAttendanceLoading) {
    return <div>Loading...</div>;
  }
  if (!employeeData) {
    return <div>No employee data found</div>;
  }

  // Filter attendance records for this employee
  const employeeAttendance = attendanceData?.filter((attendance: Attendance) => attendance.employee.id.toString() === id);

  return (
    <MainLayout>
      <Headers Title="Employee Details Page" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          {/* Employee Details */}
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-5">Employee Details:</h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Role / Position</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Phone Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={employeeData.id}>
                    <TableCell>{employeeData.employeeNumber}</TableCell>
                    <TableCell>
                      {employeeData.firstName} {employeeData.lastName}
                    </TableCell>
                    <TableCell>{employeeData.employeeStatus}</TableCell>
                    <TableCell>{employeeData.position}</TableCell>
                    <TableCell>{employeeData.emailAddress}</TableCell>
                    <TableCell>{employeeData.phoneNumber}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Department Details */}
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-5">Department:</h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department Name</TableHead>
                    <TableHead>Department Code</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Department Assistant</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{employeeData.department.departmentName}</TableCell>
                    <TableCell>{employeeData.department.departmentCode}</TableCell>
                    <TableCell>{employeeData.department.departmentHead}</TableCell>
                    <TableCell>{employeeData.department.departmentAssistant}</TableCell>
                    <TableCell>{employeeData.department.contactNumber}</TableCell>
                    <TableCell>{employeeData.department.location}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-5">Attendance List:</h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason for Absence</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employeeAttendance && employeeAttendance.length > 0 ? (
                    employeeAttendance.map((attendance: Attendance) => (
                      <TableRow key={attendance.id}>
                        <TableCell>{attendance.employee.employeeNumber}</TableCell>
                        <TableCell>{attendance.date}</TableCell>
                        <TableCell>{attendance.status}</TableCell>
                        <TableCell>{attendance.reasonForAbsence || "N/A"}</TableCell>
                        <TableCell>{attendance.remarks}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3}>No attendance records found</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Back Button */}
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
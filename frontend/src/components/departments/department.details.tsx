import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useGetDepartmentById } from "@/services/services-department";
import { useGetAllEmployees } from "@/services/services-employee";
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Employee = {
  id: string;
  employeeNumber: string;
  firstName: string;
  lastName: string;
  employeeStatus: string;
  position: string;
  emailAddress: string;
  phoneNumber: string;
  department: {
    id: string;
  };
};

const DepartmentDetails = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetDepartmentById(id || "");
  
  const { data: employees, error: employeesError } = useGetAllEmployees();
  if (employeesError) { return <div>Error loading employees data</div>; }

  // Handle loading state
  if (isLoading) {return <div>Loading...</div>;}
  if (!data) {return <div>No data found</div>;}

  // Filter employees by department ID
  const departmentEmployees = employees ? employees.filter((employee: Employee) => employee.department.id === data.id) : [];

  return (
    <MainLayout>
      <Headers Title="Department Details Page" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
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
                  <TableRow key={data.id}>
                    <TableCell>{data.departmentName}</TableCell>
                    <TableCell>{data.departmentCode}</TableCell>
                    <TableCell>{data.departmentHead}</TableCell>
                    <TableCell>{data.departmentAssistant}</TableCell>
                    <TableCell>{data.contactNumber}</TableCell>
                    <TableCell>{data.location}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
              <h1 className="scroll-m-20 text-3xl font-bold tracking-tight mb-5"> List of Employees at {data.departmentName}</h1>
              {departmentEmployees.length > 0 ? (
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
                    {departmentEmployees.map(
                      (employee: {
                        id: string;
                        employeeNumber: string;
                        firstName: string;
                        lastName: string;
                        employeeStatus: string;
                        position: string;
                        emailAddress: string;
                        phoneNumber: string;
                      }) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.employeeNumber}</TableCell>
                          <TableCell>{employee.firstName} {employee.lastName}</TableCell>
                          <TableCell>{employee.employeeStatus}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>{employee.emailAddress}</TableCell>
                          <TableCell>{employee.phoneNumber}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              ) : (
                <div>No employees found for this department yet.</div>
              )}
            </div>
          </div>
          <div className="flex ">
          <Link to={`/departments`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Departments</Button>  
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DepartmentDetails;

import { useParams } from "react-router-dom";
import { useGetEmployeeById } from "@/services/services-employee"
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const EmployeeDetails = () => {

  // Declare state variables
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeById(id || "");
 

  // Handle loading state
    if (isLoading) {return <div>Loading...</div>;}
    if (!data) {return <div>No data found</div>;}

  return (
    <MainLayout>
      <Headers Title="Employee Details Page"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
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
                  {data && (
                    <TableRow key={data.id}>
                      <TableCell>{data.employeeNumber}</TableCell>
                      <TableCell>{data.firstName} {data.lastName}</TableCell>
                      <TableCell>{data.employeeStatus}</TableCell>
                      <TableCell>{data.position}</TableCell>
                      <TableCell>{data.emailAddress}</TableCell>
                      <TableCell>{data.phoneNumber}</TableCell>
                    </TableRow>
                    )}
                  </TableBody>
              </Table>
            </div>
          </div> 
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
                  <TableRow>
                    <TableCell>{data.department.departmentName}</TableCell>
                    <TableCell>{data.department.departmentCode}</TableCell>
                    <TableCell>{data.department.departmentHead}</TableCell>
                    <TableCell>{data.department.departmentAssistant}</TableCell>
                    <TableCell>{data.department.location}</TableCell>
                    <TableCell>{data.department.contactNumber}</TableCell>
                  </TableRow>
                </TableBody>    
              </Table>  
            </div> 
          </div>
        </div>
        <div className="flex">
            <Link to={`/employees`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Employees</Button>  
            </Link>
          </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetails
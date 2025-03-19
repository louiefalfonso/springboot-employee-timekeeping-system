import {Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useGetAllEmployees } from "@/services/services-employee";
import { Link } from "react-router-dom";

const EmployeeList = () => {

  // Declare state variables
  const { data, isLoading } = useGetAllEmployees();

  // Handle loading state
    if (isLoading) {return <div>Loading...</div>;}
    if (!data) {return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5">
      <div className="flex justify-between items-center pb-5">
        <Button>
          <Link to={`/employees/add`}>Add Employee</Link>
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Number</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position / Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(
            (employee: {
              id: string; 
              employeeNumber: string;
              firstName: string;
              lastName: string;
              department: { departmentName: string } | null;
              position: string;
              employeeStatus: string;
            }) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeNumber}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.department ? employee.department.departmentName : 'N/A'}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.employeeStatus}</TableCell>
                <TableCell>
                  <Button>
                    <Link to={`/employees/${employee.id}`}>View</Link>
                  </Button>
                  <Button>
                    <Link to={`/employees/update/${employee.id}`}>Update</Link>
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default EmployeeList
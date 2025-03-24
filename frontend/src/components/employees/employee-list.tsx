import { useGetAllEmployees } from "@/services/services-employee";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EmployeeList = () => {
  
  // Declare state variables
  const { data, isLoading } = useGetAllEmployees();

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>};
  if (!data) { return <div>No data found</div>};

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
        <Link to={`/employees/add`}>
          <Button className ="bg-green-500 hover:bg-green-600"> Add Employee</Button>
        </Link>
      </div>
      <div className="min-w-full">
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
                      <Link to={`/employees/${employee.id}`}>
                        <Button className="mr-2 bg-sky-500 hover:bg-sky-600">View</Button>
                       </Link>
                       <Link to={`/employees/update/${employee.id}`}>
                        <Button className="mr-2 bg-violet-500 hover:bg-violet-600">Update</Button>
                       </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeList;
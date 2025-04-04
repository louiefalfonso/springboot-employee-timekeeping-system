import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllEmployees } from "@/services/services-employee";

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"

const EmployeeList = () => {
  
const { data, isLoading, refetch } = useGetAllEmployees();
const [searchQuery, setSearchQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;

if (isLoading) { return <div>Loading...</div>};
if (!data) { return <div>No data found</div>};
  

// Define Employee interface
interface Employee {
    id: string;
    employeeNumber: string;
    firstName: string;
    lastName: string;
    department: { departmentName: string } | null;
    position: string;
    employeeStatus: string;
}

// Filter employees based on search query
const filteredEmployees: Employee[] = searchQuery
  ? data.filter((employee: Employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.employeeStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (employee.department?.departmentName.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : data;

// Pagination
const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// Handle page change
const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
};

return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
        <Link to={`/employees/add`}>
          <Button className="bg-green-500 hover:bg-green-600">Add Employee</Button>
        </Link>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded"/>
          <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => { setSearchQuery(""); refetch(); }}> Clear Search</Button>
        </div>
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
            {paginatedEmployees.map((employee: Employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeNumber}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.department ? employee.department.departmentName : 'N/A'}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.employeeStatus}</TableCell>
                <TableCell>
                  <Link to={`/employees/${employee.id}`}>
                    <Button className="mr-2 bg-sky-500 hover:bg-sky-600" aria-label="View Employee">View</Button>
                  </Link>
                  <Link to={`/employees/update/${employee.id}`}>
                    <Button className="mr-2 bg-violet-500 hover:bg-violet-600" aria-label="Update Employee">Update</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}/>
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
);
};

export default EmployeeList;
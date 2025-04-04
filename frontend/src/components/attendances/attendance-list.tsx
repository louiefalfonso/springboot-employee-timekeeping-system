import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllAttendances } from "@/services/services-attendance";

const AttendanceList = () => {
    
// Declare state variables
const { data, isLoading, refetch } = useGetAllAttendances();
const [searchQuery, setSearchQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;

// Handle loading state
if (isLoading) { return <div>Loading...</div>;}
if (!data) { return <div>No data found</div>;}

interface Attendance {
    id: number;
    status: string;
    date: Date;
    reasonForAbsence: string;
    employee: {firstName: string; lastName: string; employeeNumber: string; employeeStatus: string; position:string} | null;
}

// Filter based on search query
const filteredAttendances: Attendance[] = searchQuery
  ? data.filter((attendance: Attendance) =>
      attendance.employee?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendance.employee?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendance.employee?.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendance.employee?.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      attendance.status.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

// Pagination
const totalPages = Math.ceil(filteredAttendances.length / itemsPerPage);
const paginatedAttendances = filteredAttendances.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// Handle page change
const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
};

return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/attendances/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Attendance</Button>
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
                    <TableHead>Date</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Role / Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason For Absence</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedAttendances.map((attendance: Attendance) => (
                    <TableRow key={attendance.id}>
                        <TableCell>{format(new Date(attendance.date), 'MM/dd/yyyy')}</TableCell>
                        <TableCell>{attendance.employee?.firstName} {attendance.employee?.lastName}</TableCell>
                        <TableCell>{attendance.employee?.employeeNumber}</TableCell>
                        <TableCell>{attendance.employee?.position}</TableCell>
                        <TableCell>{attendance.status}</TableCell>
                        <TableCell>{attendance.reasonForAbsence}</TableCell>
                        <TableCell>
                            <Link to={`/attendances/edit/${attendance.id}`}>
                                <Button className="bg-violet-500 hover:bg-violet-600">Update</Button>
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
  )
}

export default AttendanceList
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useGetAllLeaveAbsence } from "@/services/services-leave-absence";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const LeaveAbsenceList = () => {

  // Declare state variables
  const { data, isLoading, refetch } = useGetAllLeaveAbsence();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle loading state
   if (isLoading) { return <div>Loading...</div>;}
   if (!data) { return <div>No data found</div>;}

   interface LeaveAbsence {
    id: number;
    startDate: Date;
    endDate: Date;
    leaveType: string;
    status: string;
    employee: { firstName: string; lastName: string; employeeNumber: string; employeeStatus: string; position:string } | null;
  }

  // Filter based on search query
  const fillteredLeaveAbsences: LeaveAbsence[] = searchQuery
    ? data.filter((leaveAbsence: LeaveAbsence) =>
        leaveAbsence.employee?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaveAbsence.employee?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaveAbsence.employee?.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaveAbsence.employee?.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaveAbsence.leaveType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        leaveAbsence.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;
  
    // Pagination
  const totalPages = Math.ceil(fillteredLeaveAbsences.length / itemsPerPage);
  const paginatedLeaveAbsences = fillteredLeaveAbsences.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
};

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/leave-absences/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Leave / Absence</Button>
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
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Leave Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  {paginatedLeaveAbsences.map((leaveAbsence: LeaveAbsence) => (
                      <TableRow key={leaveAbsence.id}>
                          <TableCell>{`${leaveAbsence.employee?.firstName} ${leaveAbsence.employee?.lastName}`}</TableCell>
                          <TableCell>{leaveAbsence.employee?.employeeNumber}</TableCell>
                          <TableCell>{format(new Date(leaveAbsence.startDate), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{format(new Date(leaveAbsence.endDate), 'dd/MM/yyyy')}</TableCell>
                          <TableCell>{leaveAbsence.leaveType}</TableCell>
                          <TableCell>{leaveAbsence.status}</TableCell>
                          <TableCell>
                            <Link to={`/leave-absences/edit/${leaveAbsence.id}`}>
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

export default LeaveAbsenceList
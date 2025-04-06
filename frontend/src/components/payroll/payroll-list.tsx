import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllPayrolls } from "@/services/services-payroll";

const PayrollList = () => {

  // Declare state variables
  const { data, isLoading, refetch } = useGetAllPayrolls();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>; }
  if (!data) { return <div>No data found</div>; }

  interface Payroll {
    id: number;
    payPeriodStartDate: Date;
    payPeriodEndDate: Date;
    grossPay: string;
    deductions: string;
    netPay: string;
    paymentDate: Date;
    remarks: string;
    employee: {firstName: string; lastName: string; employeeNumber: string; employeeStatus: string; position:string} | null;
}

// Filter based on search query
const filteredPayrolls: Payroll[] = searchQuery
  ? data.filter((payroll: Payroll) =>
      payroll.employee?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payroll.employee?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payroll.employee?.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payroll.employee?.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payroll.paymentDate.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

// Pagination
const totalPages = Math.ceil(filteredPayrolls.length / itemsPerPage);
const paginatedPayrolls = filteredPayrolls.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// Handle page change
const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
         <Link to={``}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Attendance</Button>
          </Link>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded"/>
            <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => { setSearchQuery(""); refetch(); }}> Clear Search</Button>
         </div>
      </div>
      <div className="min-w-full">
        
      </div>
    </div>
  )
}

export default PayrollList
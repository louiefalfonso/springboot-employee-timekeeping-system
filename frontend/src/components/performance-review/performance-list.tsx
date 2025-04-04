import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { useGetAllPerformanceReviews } from "@/services/service-performance";
const PerformanceReviewList = () => {

  // Declare state variables
  const { data, isLoading, refetch } = useGetAllPerformanceReviews();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  interface PerformanceReview {
    id: number;
    reviewDate: Date;
    rating: string;
    reviewedBy: string;
    reviewStatus: string;
    employee: { firstName: string; lastName: string; employeeNumber: string; position:string } | null;
  }

  // Filter based on search query
  const fillteredPerformanceReviews: PerformanceReview[] = searchQuery
    ? data.filter((performanceReview: PerformanceReview) =>
        performanceReview.employee?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        performanceReview.employee?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        performanceReview.employee?.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        performanceReview.employee?.employeeNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        performanceReview.rating.toLowerCase().includes(searchQuery.toLowerCase()) ||
        performanceReview.reviewStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        performanceReview.reviewedBy.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : data;
  
  // Pagination
  const totalPages = Math.ceil(fillteredPerformanceReviews.length / itemsPerPage);
  const paginatedPerformanceReviews = fillteredPerformanceReviews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/performance-reviews/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Performance Review</Button>
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
                    <TableHead>Review Date</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Role / Position</TableHead>
                    <TableHead>Reviewed By</TableHead>
                    <TableHead>Review Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedPerformanceReviews.map((performanceReview: PerformanceReview) => (
                  <TableRow key={performanceReview.id}>
                    <TableCell>{format(new Date(performanceReview.reviewDate), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{`${performanceReview.employee?.firstName} ${performanceReview.employee?.lastName}`}</TableCell>
                    <TableCell>{performanceReview.employee?.employeeNumber}</TableCell>
                    <TableCell>{performanceReview.employee?.position}</TableCell>
                    <TableCell>{performanceReview.reviewedBy}</TableCell>
                    <TableCell>{performanceReview.reviewStatus}</TableCell>
                    <TableCell>
                      <Link to={`/performance-reviews/edit/${performanceReview.id}`}>
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

export default PerformanceReviewList
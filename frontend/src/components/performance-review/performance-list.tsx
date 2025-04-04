import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useGetAllPerformanceReviews } from "@/services/service-performance";
const PerformanceReviewList = () => {

  // Declare state variables
  const { data, isLoading } = useGetAllPerformanceReviews()

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/performance-reviews/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Performance Review</Button>
          </Link>
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
            {data.map(
              (performanceReview:{
                id: string,
                reviewDate: Date,
                rating: string;
                reviewedBy: string;
                reviewStatus: string;
                employee: { firstName: string; lastName: string; employeeNumber: string; position: string} | null;
              }) => (
                <TableRow key={performanceReview.id}>
                  <TableCell>{format(new Date(performanceReview.reviewDate), 'MM/dd/yyyy')}</TableCell>
                  <TableCell>{performanceReview.employee?.firstName} {performanceReview.employee?.lastName}</TableCell>
                  <TableCell>{performanceReview.employee?.employeeNumber}</TableCell>
                  <TableCell>{performanceReview.employee?.position}</TableCell>
                  <TableCell>{performanceReview.reviewedBy}</TableCell>
                  <TableCell>{performanceReview.reviewStatus}</TableCell>
                  <TableCell>
                      <Link to={`/performance-reviews/update/${performanceReview.id}`}>
                          <Button className="mr-2 bg-violet-500 hover:bg-violet-600" aria-label="Update Employee">Update</Button>
                      </Link>
                  </TableCell>
                </TableRow>
              )
            )}
            </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PerformanceReviewList
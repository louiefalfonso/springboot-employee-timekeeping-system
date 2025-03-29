import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useGetAllLeaveAttendances } from "@/services/services-leave-absence";

const LeaveAbsenceList = () => {

  // Declare state variables
  const { data, isLoading } = useGetAllLeaveAttendances()

  // Handle loading state
   if (isLoading) { return <div>Loading...</div>;}
   if (!data) { return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={``}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Leave / Absence</Button>
          </Link>
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
              {data.map(
                (leaveAbsence:{
                  id: string;
                  startDate: Date;
                  endDate: Date;
                  leaveType: string;
                  status: string;
                  employee: { firstName: string; lastName: string; employeeNumber: string; employeeStatus: string; position:string } | null;
                }) => (
                  <TableRow key={leaveAbsence.id}>
                    <TableCell>{leaveAbsence.employee?.firstName} {leaveAbsence.employee?.lastName}</TableCell>
                    <TableCell>{leaveAbsence.employee?.employeeNumber}</TableCell>
                    <TableCell>{format(new Date(leaveAbsence.startDate), 'MM-dd-yyyy')}</TableCell>
                    <TableCell>{format(new Date(leaveAbsence.endDate), 'MM-dd-yyyy')}</TableCell>
                    <TableCell>{leaveAbsence.leaveType}</TableCell>
                    <TableCell>{leaveAbsence.status}</TableCell>
                    <TableCell>
                      <Link to={``}>
                          <Button className="mr-2 bg-violet-500 hover:bg-violet-600" aria-label="Update Leave & Absence">Update</Button>
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

export default LeaveAbsenceList
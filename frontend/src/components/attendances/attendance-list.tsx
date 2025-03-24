
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllAttendances } from "@/services/services-attendance";
import { format } from "date-fns";

const AttendanceList = () => {
    // Declare state variables
   const { data, isLoading } = useGetAllAttendances()

   // Handle loading state
    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/attendances/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Attendance</Button>
          </Link>
      </div>
      <div className="min-w-full">
      <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Date (yyyy-MM-dd)</TableHead>
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Employee Number</TableHead>
                    <TableHead>Role / Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Reason For Absence</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(
                    (attendance:{
                        id: string;
                        status: string;
                        date: Date;
                        reasonForAbsence: string;
                        employee: { firstName: string; lastName: string; employeeNumber: string; employeeStatus: string; position:string } | null;
                    }) => (
                        <TableRow key={attendance.id}>
                            <TableCell>{format(new Date(attendance.date), 'yyyy-MM-dd')}</TableCell>
                            <TableCell>{attendance.employee?.firstName} {attendance.employee?.lastName}</TableCell>
                            <TableCell>{attendance.employee?.employeeNumber}</TableCell>
                            <TableCell>{attendance.employee?.position}</TableCell>
                            <TableCell>{attendance.status}</TableCell>
                            <TableCell>{attendance.reasonForAbsence}</TableCell>  
                            <TableCell>
                                <Link to={``}>
                                    <Button className="bg-violet-500 hover:bg-violet-600">Update</Button>
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

export default AttendanceList
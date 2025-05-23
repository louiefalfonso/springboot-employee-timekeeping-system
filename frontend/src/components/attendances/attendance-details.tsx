import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { useGetAttendanceById } from "@/services/services-attendance";

const AttendanceDetails = () => { 
  
  // Declare state variables
  const { id } = useParams();
  const { data, isLoading } = useGetAttendanceById(id || "");

  // Handle loading state
  if (isLoading) {return <div>Loading...</div>;}
  if (!data) {return <div>No data found</div>;}

  return (
    <MainLayout>
      <Headers Title="Attendance Details Page"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Remarks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={data.id}>
                            <TableCell>{data.employee.firstName} {data.employee.lastName}</TableCell> 
                            <TableCell>{data.status}</TableCell> 
                            <TableCell>{format(new Date(data.date), 'MM/dd/yyyy')}</TableCell>
                            <TableCell>{data.reasonForAbsence}</TableCell> 
                            <TableCell>{data.remarks}</TableCell>
                        </TableRow>
                    </TableBody>    
                </Table>    
            </div>
          </div>
          <div className="flex ">
            <Link to={`/attendances`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Attendance</Button>  
            </Link>
          </div>
         </div>
       </div>   
    </MainLayout>  
  )
}

export default AttendanceDetails
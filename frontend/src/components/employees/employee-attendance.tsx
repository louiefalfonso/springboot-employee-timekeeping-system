import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Attendance = {
    id: number;
    date: string;
    status: string;
    reasonForAbsence: string;
    remarks: string;
    employee: {
      id: number;
      employeeNumber: string;
    };
  };

const AttendanceRecordsTable = ({ attendanceData }: { attendanceData: Attendance[] | undefined }) => {
    return (
        <div className="rounded-md border p-5 w-full overflow-x-auto">
          <div className="min-w-full">
            <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Attendance:</h1>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason for Absence</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceData && attendanceData.length > 0 ? (
                  attendanceData.map((attendance: Attendance) => (
                    <TableRow key={attendance.id}>
                      <TableCell>{attendance.date}</TableCell>
                      <TableCell>{attendance.status}</TableCell>
                      <TableCell>{attendance.reasonForAbsence}</TableCell>
                      <TableCell>{attendance.remarks}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>No attendance records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
      </div>
    )
  }
  
  export default AttendanceRecordsTable
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type LeaveAbsence = {
    id: string;
    startDate: string;
    endDate: string;
    leaveType: string;
    status: string;
    reasonForLeave: string;
    remarks: string;
    employee: {
      id: number;
      employeeNumber: string;
    };
  };

const LeaveAbsenceRecordsTable = ({ leaveAbsenceData }: { leaveAbsenceData: LeaveAbsence[] | undefined }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
    <div className="min-w-full">
      <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Leave & Absence List:</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaveAbsenceData && leaveAbsenceData.length > 0 ? (
            leaveAbsenceData.map((leaveAbsence: LeaveAbsence) => (
              <TableRow key={leaveAbsence.id}>
                <TableCell>{leaveAbsence.startDate}</TableCell>
                <TableCell>{leaveAbsence.endDate}</TableCell>
                <TableCell>{leaveAbsence.leaveType}</TableCell>
                <TableCell>{leaveAbsence.status}</TableCell>
                <TableCell>{leaveAbsence.remarks}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>No leave absence records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  </div>
  )
}

export default LeaveAbsenceRecordsTable
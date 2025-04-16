
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EmployeeDetailsTable = ({ employeeData }: { employeeData: any }) => (
  <div className="rounded-md border p-5 w-full overflow-x-auto">
    <div className="min-w-full">
      <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Employee Details:</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee Number</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role / Position</TableHead>
            <TableHead>Email Address</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Date Of Birth</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={employeeData.id}>
            <TableCell>{employeeData.employeeNumber}</TableCell>
            <TableCell>{employeeData.firstName} {employeeData.lastName}</TableCell>
            <TableCell>{employeeData.employeeStatus}</TableCell>
            <TableCell>{employeeData.position}</TableCell>
            <TableCell>{employeeData.emailAddress}</TableCell>
            <TableCell>{employeeData.phoneNumber}</TableCell>
            <TableCell>{employeeData.dateOfBirth}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
);

export default EmployeeDetailsTable;

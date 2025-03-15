import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";


export default function EmployeeList() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Number</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position / Role</TableHead>
          <TableHead>Email Address</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>SYS-3526-05628</TableCell>
          <TableCell>Kyle</TableCell>
          <TableCell>Richardson</TableCell>
          <TableCell>HR and Payroll</TableCell>
          <TableCell>Human Resources Trainee</TableCell>
          <TableCell>kyle.richardson@company.com</TableCell>
          <TableCell><Button variant="outline">Button</Button></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

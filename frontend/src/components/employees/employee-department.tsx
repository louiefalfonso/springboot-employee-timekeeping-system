import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DepartmentDetailsTable = ({ departmentData }: { departmentData: any }) => {
  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
        <div className="min-w-full">
            <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Department:</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Department Name</TableHead>
                        <TableHead>Department Code</TableHead>
                        <TableHead>Department Head</TableHead>
                        <TableHead>Department Assistant</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Location</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{departmentData.departmentName}</TableCell>
                        <TableCell>{departmentData.departmentCode}</TableCell>
                        <TableCell>{departmentData.departmentHead}</TableCell>
                        <TableCell>{departmentData.departmentAssistant}</TableCell>
                        <TableCell>{departmentData.contactNumber}</TableCell>
                        <TableCell>{departmentData.location}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>    
        </div>
  </div>
  )
}

export default DepartmentDetailsTable
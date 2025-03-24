import { useGetAllDepartments } from "@/services/services-department"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Toaster } from "@/components/ui/sonner"
const DepartmentList = () => {

   // Declare state variables
   const { data, isLoading } = useGetAllDepartments();

     // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex justify-between items-center pb-5">
          <Link to={`/departments/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add Department</Button>
          </Link>
      </div>
      <div className="min-w-full">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Department Name</TableHead>
                    <TableHead>Department Code</TableHead>
                    <TableHead>Department Head</TableHead>
                    <TableHead>Contact Number</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map(
                    (department:{
                        id: string;
                        departmentName: string;
                        departmentCode: string;
                        departmentHead: string;
                        contactNumber: string;
                        location: string;
                    }) => (
                        <TableRow key={department.id}>
                            <TableCell>{department.departmentName}</TableCell>
                            <TableCell>{department.departmentCode}</TableCell>
                            <TableCell>{department.departmentHead}</TableCell>
                            <TableCell>{department.contactNumber}</TableCell>
                            <TableCell>{department.location}</TableCell>
                            <TableCell>
                                <Link to={`/departments/${department.id}`}>
                                    <Button className="mr-3 bg-sky-500 hover:bg-sky-600">View</Button>
                                </Link>
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
      <Toaster />
    </div> 
  )
}

export default DepartmentList
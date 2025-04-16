import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { useGetProjectById } from "@/services/services-project";

const ProjectDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetProjectById(id || "");
  
  // Handle loading state
  if (isLoading) {return <div>Loading...</div>;}
  if (error) {return <div>Error loading data: {error.message}</div>;}
  if (!data) {return <div>No data found</div>;}

  return (
    <MainLayout>
      <Headers Title="Project Details Page" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
            <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Project Details:</h1>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">Start Date</TableHead>
                    <TableHead className="text-center">Due Date</TableHead>
                    <TableHead className="text-center">Project Manager</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-center">Project Name</TableHead>
                    <TableHead className="text-center">Project Description</TableHead>
                    <TableHead className="text-center">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow key={data.id}>
                    <TableCell className="text-wrap text-center">{format(new Date(data.startDate), 'MM/dd/yyyy')}</TableCell>
                    <TableCell className="text-wrap text-center">{format(new Date(data.dueDate), 'MM/dd/yyyy')}</TableCell>
                    <TableCell className="text-wrap text-center">{data.projectManager}</TableCell>
                    <TableCell className="text-wrap text-center">{data.status}</TableCell>
                    <TableCell className="text-wrap text-center">{data.projectName}</TableCell>
                    <TableCell className="text-wrap text-center">{data.description}</TableCell>
                    <TableCell className="text-wrap text-center">{data.remarks}</TableCell>
                  </TableRow> 
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="rounded-md border p-5 w-full overflow-x-auto">
            <div className="min-w-full">
              <h1 className="scroll-m-20 text-xl font-bold tracking-tight mb-5">Assign Employee:</h1>
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
                  <TableRow>
                  <TableCell>{data.employee.employeeNumber}</TableCell>
                    <TableCell>{data.employee.firstName} {data.employee.lastName}</TableCell>
                    <TableCell>{data.employee.employeeStatus}</TableCell>
                    <TableCell>{data.employee.position}</TableCell>
                    <TableCell>{data.employee.emailAddress}</TableCell>
                    <TableCell>{data.employee.phoneNumber}</TableCell>
                    <TableCell>{data.employee.dateOfBirth}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="flex ">
          <Link to={`/projects`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Projects</Button>  
            </Link>
          </div>
      </div>
    </MainLayout>
  )
}

export default ProjectDetails
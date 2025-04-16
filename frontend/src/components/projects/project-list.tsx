import { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllProjects } from "@/services/services-project";
const ProjectLists = () => {

// Declare state variables
const { data, isLoading, error, refetch} = useGetAllProjects();
const [searchQuery, setSearchQuery] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 8;

// Handle loading state
if (isLoading) { return <div>Loading...</div>;}
if (!data) { return <div>No data found</div>;}
if (error) { return <div>Error loading projects: {error.message}</div>; }

interface Project {
  id: number;
  projectName: string;
  status: string;
  description: string;
  remarks: string;
  projectManager: string;
  startDate: Date; 
  dueDate: Date;
  employee: {firstName: string; lastName: string; employeeNumber: string; employeeStatus: string; position:string} | null;
}

// Filter based on search query
const filteredProjects: Project[] = searchQuery
  ? data.filter((project: Project) =>
      project.employee?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.employee?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectManager.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

// Pagination
const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

// Handle page change
const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
};

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="flex flex-col md:flex-row justify-between items-center pb-5 space-y-2 md:space-y-0 md:space-x-2">
        <Link to={`/projects/add`}>
            <Button className ="bg-green-500 hover:bg-green-600">Add New Project</Button>
        </Link>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <Input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="p-2 border rounded"/>
            <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => { setSearchQuery(""); refetch(); }}> Clear Search</Button>
         </div>
      </div>
      <div className="min-w-full">
      <Table>
          <TableHeader>
            <TableRow>
             <TableHead>Start Date</TableHead>
             <TableHead>Due Date</TableHead>
             <TableHead>Project Name</TableHead>
             <TableHead>Assigned Employee</TableHead>
             <TableHead>Project Manager</TableHead>
             <TableHead>Status</TableHead> 
            </TableRow>
          </TableHeader>
          <TableBody>
          {paginatedProjects.map((project: Project) => (
            <TableRow key={project.id}>
              <TableCell>{format(new Date(project.startDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{format(new Date(project.dueDate), 'MM/dd/yyyy')}</TableCell>
              <TableCell>{project.projectName}</TableCell>
              <TableCell>{project.employee?.firstName} {project.employee?.lastName}</TableCell>
              <TableCell>{project.projectManager}</TableCell>
              <TableCell>{project.status}</TableCell>
              <TableCell>
                <Link to={`/projects/${project.id}`}>
                    <Button className="mr-2 bg-sky-500 hover:bg-sky-600" aria-label="View Employee">View</Button>
                </Link>
                <Link to={`/projects/update/${project.id}`}>
                    <Button className="mr-2 bg-violet-500 hover:bg-violet-600">Update</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
      <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)}/>
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => handlePageChange(currentPage + 1)}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
      </div>
      </div>
   </div>   
  )
}

export default ProjectLists
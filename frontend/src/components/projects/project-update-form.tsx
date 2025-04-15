import React from "react";
import { Link } from "react-router-dom";
import { format, parseISO  } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DeleteProjectDialog from "./project-delete"

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
};

type ProjectFormProps = {
  projectName: string;
  setProjectName: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  description: string;
  setDescription:(value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  projectManager: string; 
  setProjectManager: (value: string) => void;

  startDate:  Date | undefined;
  setStartDate: (value: Date | undefined) => void;

  dueDate:  Date | undefined;
  setDueDate: (value: Date | undefined) => void;

  employeeId: number | null;
  setEmployeeId: (value: number | null) => void;
  employees: Employee[] | undefined;

  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  projectId: string;
}

const UpdateProjectForm: React.FC<ProjectFormProps> = ({
  projectName, 
  setProjectName,
  status, 
  setStatus,
  description, 
  setDescription,
  remarks, 
  setRemarks,

  projectManager, 
  setProjectManager,

  startDate, 
  setStartDate,
  dueDate, 
  setDueDate,
  employeeId,setEmployeeId,employees,
  handleSubmit,handleDelete,projectId,
}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div className="grid auto-rows-min md:grid-cols-3">
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="employee">Employee:</Label>
        <Select value={employeeId ? employeeId.toString() : undefined}
          onValueChange={(value) => {
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
              setEmployeeId(parsedValue);
            }
          }}
        >
          <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Employee" />
          </SelectTrigger>
          <SelectContent>
            {employees?.map((employee: Employee) => (
              <SelectItem key={employee.id} value={employee.id.toString()}>
                {employee.firstName} {employee.lastName} - {employee.employeeNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="startDate">Start Date :</Label>
        <Input
            type="date"
            id="startDate"
            value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const selectedDate = e.target.value ? parseISO(e.target.value) : undefined;
              setStartDate(selectedDate);
            }}
          />
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="dueDate">Due Date :</Label>
        <Input
            type="date"
            id="dueDate"
            value={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const selectedDate = e.target.value ? parseISO(e.target.value) : undefined;
              setDueDate(selectedDate);
            }}
          />
      </div>
    </div>
    <div className="grid auto-rows-min md:grid-cols-3">
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="projectName">Project Name:</Label>
        <Input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)}/>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="projectManager">Project Manager:</Label>
        <Input type="text" id="projectManager" value={projectManager} onChange={(e) => setProjectManager(e.target.value)}/>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="status">Status:</Label>
        <Input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)}/>
      </div>
    </div> 
    <div className="grid auto-rows-min md:grid-cols-3">
      <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="description">Project Description:</Label>
          <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)}/>
      </div>
    </div>
    <div className="flex pl-4 mt-4 ">
      <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Project">Update</Button>
      <DeleteProjectDialog projectId={projectId} onDelete={handleDelete} aria-label="Delete Project"/>
      <Link to={`/projects`}>
        <Button className ="bg-gray-500 hover:bg-gray-600">Back to Projects</Button>  
      </Link>
    </div>
    </form>

    
  )
}

export default UpdateProjectForm
import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
};

type Project = {
  id?: string;
  projectName?: string;
  status?: string;
  description?: string;
  remarks?: string;
  projectManager?: string;
  startDate?: string; 
  dueDate?: string;
  employee: Employee | null;
}

interface ProjectFormProps {
  employees : Employee[];
  onSubmit: (project : Project) => void;
}

const AddProjectForm: React.FC<ProjectFormProps> = ({ employees, onSubmit }) => {

  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const handleEmployeeSelect = useCallback((employeeId: number) => {
    const employee = employees.find((employee) => employee.id === employeeId) || null;
    setSelectedEmployee(employee);
  }, [employees]);

  const newProject = useMemo<Project>(
    () => ({
      projectName,
      status,
      description,  
      remarks,
      projectManager,
      startDate: startDate ? format(startDate, "MM-dd-yyyy") : undefined,
      dueDate: dueDate ? format(dueDate, "MM-dd-yyyy") : undefined,
      employee: selectedEmployee,
    }),
    [projectName, status, description, remarks, projectManager, startDate, dueDate, selectedEmployee ]
  );

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault();
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    onSubmit(newProject);
  }

  return (
    <form onSubmit={handleSubmit}>
    <div className="grid auto-rows-min md:grid-cols-3">
      <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="employee">Employee:</Label>
          <Select onValueChange={(value) => handleEmployeeSelect(parseInt(value))}>
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
        <Input type="date" id="startDate" value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
          onChange={(e) => {
            const selectedDate = e.target.value ? new Date(e.target.value) : null;
            setStartDate(selectedDate);
          }}
          /> 
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="dueDate">Due Date :</Label>
        <Input type="date" id="dueDate" value={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
          onChange={(e) => {
            const selectedDate = e.target.value ? new Date(e.target.value) : null;
            setDueDate(selectedDate);
          }}
          /> 
      </div>
    </div>
    <div className="grid auto-rows-min md:grid-cols-3">
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="projectName">Project Name:</Label>
        <Input type="text" id="projectName" placeholder="Project Name" onChange={(e) => setProjectName(e.target.value)}/>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="projectManager">Project Manager:</Label>
        <Input type="text" id="projectManager" placeholder="Project manager" onChange={(e) => setProjectManager(e.target.value)}/>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
        <Label htmlFor="status">Status:</Label>
        <Input type="text" id="status" placeholder="Status" onChange={(e) => setStatus(e.target.value)}/>
      </div>
    </div> 
    <div className="grid auto-rows-min md:grid-cols-3">
      <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="description">Project Description:</Label>
          <Textarea id="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
      </div>
    </div>
    <div className="flex pl-4 mt-4 ">
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">Add Project</Button>
        <Link to={`/projects`}>
          <Button className ="bg-gray-500 hover:bg-gray-600">Back to Projects</Button>  
        </Link>
      </div>
    </form>
  )
}

export default AddProjectForm
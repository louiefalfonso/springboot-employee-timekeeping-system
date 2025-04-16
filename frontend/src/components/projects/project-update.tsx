import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { toast } from "sonner"
import { format } from "date-fns";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useDeleteProject, useGetProjectById, useUpdateProject } from "@/services/services-project";
import { useGetAllEmployees } from "@/services/services-employee";
import UpdateProjectForm from "./project-update-form";
const UpdateProject = () => {

  // get payroll ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

   // fetch payroll  & employee data
   const { data, isLoading } = useGetProjectById(id || "");
   const { mutate } = useUpdateProject(id || "");
   const { mutate: deleteProject } = useDeleteProject();
   const { data: employees } = useGetAllEmployees();

  // project data
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [projectName, setProjectName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(()=>{
    if(data){
      setStartDate(data.startDate);
      setDueDate(data.dueDate);
      setProjectName(data.projectName);
      setStatus(data.status);
      setDescription(data.description);
      setRemarks(data.remarks);
      setProjectManager(data.projectManager);
      setEmployeeId(data.employee.id);
    }
  }, [data]);

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update project
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }

    const currentProject = {
      id: id || "",
      startDate: startDate ? format(startDate, "MM-dd-yyyy") : undefined,
      dueDate: dueDate ? format(dueDate, "MM-dd-yyyy") : undefined,
      projectName, 
      projectManager, 
      status, 
      remarks, 
      description,
      employee : { id : employeeId }
    }

    try {
      mutate(currentProject, {
        onSuccess: () => {
          toast.success("Project Updated Successfully");
          navigate("/projects");
        },
        onError: (error) => {
          console.error("Error Updating Projects:", error);
          toast.error("Failed to Update Project. Please try again.");
        },
      })
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  // delete project
  const handleDelete = () => {
    try {
      deleteProject(id || "", {
        onSuccess: () => {
          toast.success("Projects Deleted Successfully");
          navigate("/projects");
        },
        onError: (error) => {
          console.error("Error Deleting Project:", error);
          toast.error("Failed to Delete Project. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  return (
    <MainLayout>
      <Headers Title="Update Leave / Absence" />
      <UpdateProjectForm
        projectName={projectName}
        setProjectName={setProjectName}
        status={status}
        setStatus={setStatus}
        description={description}
        setDescription={setDescription}
        remarks={remarks}
        setRemarks={setRemarks}
        projectManager={projectManager}
        setProjectManager={setProjectManager}
        startDate={startDate}
        setStartDate={setStartDate}
        dueDate={dueDate}
        setDueDate={setDueDate}
        employeeId={employeeId}
        setEmployeeId={setEmployeeId}
        employees={employees}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        projectId={id || ""}
      />
    </MainLayout>
  )
}

export default UpdateProject
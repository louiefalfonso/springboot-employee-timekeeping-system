import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetAllEmployees } from "@/services/services-employee";
import { useAddNewProject } from "@/services/services-project";
import AddNewProjectForm from "./project-add-form"
const AddNewProject = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewProject();
  const { data: employees } = useGetAllEmployees();

   // Handle form submission
   const handleFormSubmit = (newProject) => {
    try {
      mutate(newProject, {
        onSuccess: () => {
          toast.success("Project Added Successfully");
          navigate("/projects");
        },
        onError: (error) => {
          console.error("Error Adding Project:", error);
          toast.error("Failed to Add Project.");
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  
  }

  return (
    <MainLayout>
      <Headers Title="Add New Employee Project" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewProjectForm employees={employees || []} onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>
  )
}

export default AddNewProject
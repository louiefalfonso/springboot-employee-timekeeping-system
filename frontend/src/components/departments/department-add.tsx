import { useNavigate } from "react-router-dom"
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";;

import { useAddNewDepartment } from "@/services/services-department";
import AddDepartmentForm from "./department-add-form";

const AddDepartment = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewDepartment();

  // Handle form submission
  const handleFormSubmit = (newDepartment) => { 
    try {
      mutate(newDepartment, {
        onSuccess: () => {
          toast.success("Department Added Successfully!");
          navigate("/departments");
        },
        onError: (error) => {
          console.error("Error Adding Department:", error);
          toast.error("Failed to Add Department.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  }

  return (
    <MainLayout>
      <Headers Title="Add Department" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <AddDepartmentForm onSubmit={handleFormSubmit} />
      </div>
    </MainLayout>
  )
}

export default AddDepartment
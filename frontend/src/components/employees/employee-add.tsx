import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useAddNewEmployee } from "@/services/services-employee";
import { useGetAllDepartments } from "@/services/services-department";
import { AddNewEmployeeForm } from "./employee-add-form";

const AddEmployee = () => {
  
  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewEmployee();
  const { data: departments } = useGetAllDepartments();

  // Handle form submission
  const handleFormSubmit = (newEmployee) => {
    try {
      mutate(newEmployee, {
        onSuccess: () => {
          toast.success("Employee Added Successfully");
          navigate("/employees");
        },
        onError: (error) => {
          console.error("Error adding Employee:", error);
          toast.error("Failed to add Employee.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add Employee" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewEmployeeForm departments={departments || []} onSubmit={handleFormSubmit} />
      </div>
    </MainLayout>
  );
};

export default AddEmployee;
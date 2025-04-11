import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useAddNewPayroll } from "@/services/services-payrolls";
import { useGetAllEmployees } from "@/services/services-employee";
import AddNewPayrollForm from "./payroll-add-form";

const AddNewPayroll = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewPayroll();
  const { data: employees } = useGetAllEmployees();
  
 // Handle form submission
  const handleFormSubmit = (newPayroll) => {
    try {
      mutate(newPayroll, {
        onSuccess: () => {
          toast.success("Payroll Added Successfully");
          navigate("/payrolls");
        },
        onError: (error) => {
          console.error("Error Adding Payroll:", error);
          toast.error("Failed to Add Payroll.");
        }
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  
  }

  return (
    <MainLayout>
      <Headers Title="Add New Employee Payroll" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewPayrollForm employees={employees || []} onSubmit={handleFormSubmit} />
      </div>  
    </MainLayout>  
  )
}

export default AddNewPayroll
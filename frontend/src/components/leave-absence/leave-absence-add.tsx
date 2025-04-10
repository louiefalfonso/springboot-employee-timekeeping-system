import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetAllEmployees } from "@/services/services-employee";
import { useAddLeaveAbsence } from "@/services/services-leave-absence";
import AddLeaveAbsenceForm from "./leave-absence-add-form";

const AddNewLeaveAbsence = () => {

   // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddLeaveAbsence();
  const { data: employees } = useGetAllEmployees();

  // Handle form submission
  const handleFormSubmit = (newLeaveAbsence) => {
    try {
      mutate(newLeaveAbsence, {
        onSuccess: () => {
          toast.success("Leave / Absence Added Successfully");
          navigate("/leave-absences");
        },
        onError: (error) => {
          console.error("Error Adding Leave / Absence:", error);
          toast.error("Failed to Add Leave / Absence.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add New Leave / Absence" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddLeaveAbsenceForm employees={employees || []} onSubmit={handleFormSubmit}/>
      </div>
    </MainLayout>
  );
};

export default AddNewLeaveAbsence;

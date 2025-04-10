import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetAllEmployees } from "@/services/services-employee";
import { useAddNewPerformanceReview } from "@/services/service-performance";
import AddNewPerformanceReviewForm from "./performance-add-form";

const AddPerformanceReview = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewPerformanceReview();
  const { data: employees } = useGetAllEmployees();

  // Handle form submission
  const handleFormSubmit = (newPerformanceReview) => {
    try {
      mutate(newPerformanceReview, {
        onSuccess: () => {
          toast.success("Performance Review Added Successfully");
          navigate("/performance-reviews");
        },
        onError: (error) => {
          console.error("Error Adding Performance Review:", error);
          toast.error("Failed to Add Performance Review.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add New Performance Review" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AddNewPerformanceReviewForm employees={employees || []} onSubmit={handleFormSubmit}/>
      </div>
   </MainLayout>   
  )
}

export default AddPerformanceReview
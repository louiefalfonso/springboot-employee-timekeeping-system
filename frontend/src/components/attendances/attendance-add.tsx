import { useNavigate} from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useAddNewAttendance } from "@/services/services-attendance";
import { useGetAllEmployees } from "@/services/services-employee";
import AttendanceForm from "@/components/attendances/attendance-add-form";

const AddNewAttendance = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewAttendance();
  const { data: employees } = useGetAllEmployees();

  // Handle form submission
  const handleFormSubmit = (newAttendance) => {
    try {
      mutate(newAttendance, {
        onSuccess: () => {
          toast.success("Attendance Added Successfully");
          navigate("/attendances");
        },
        onError: (error) => {
          console.error("Error Adding Attendance:", error);
          toast.error("Failed to add Attendance.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add New Attendance" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <AttendanceForm employees={employees || []} onSubmit={handleFormSubmit} />
      </div>
    </MainLayout>
  );
};

export default AddNewAttendance;
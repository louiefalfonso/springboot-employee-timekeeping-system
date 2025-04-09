import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetAllEmployees } from "@/services/services-employee";
import { useDeleteLeaveAbsence, useGetLeaveAbsenceById, useUpdateLeaveAbsence } from "@/services/services-leave-absence";
import UpdateLeaveAbsenceForm from "./leave-absence-update-form";

const UpdateLeaveAbsence = () => {

  // get leave / absence ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch leave / absence & employee data
  const { data, isLoading } = useGetLeaveAbsenceById(id || "");
  const { mutate } = useUpdateLeaveAbsence(id || "");
  const { mutate: deleteLeaveAbsence } = useDeleteLeaveAbsence();
  const { data: employees } = useGetAllEmployees();

  // leave / absence data
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [leaveType, setLeaveType] = useState("");
  const [status, setStatus] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");
  const [remarks, setRemarks] = useState("");
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setStartDate(data.startDate);
      setEndDate(data.endDate);
      setLeaveType(data.leaveType)
      setReasonForLeave(data.reasonForLeave)
      setStatus(data.status);
      setRemarks(data.remarks)
      setEmployeeId(data.employee.id);
    }
  }, [data]);

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  // update leave / absence 
  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }

    const currentLeaveAbsence ={
      id: id || "",
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      leaveType,
      status,
      reasonForLeave,
      remarks,
      employee: employeeId
    }

    try {
      mutate(currentLeaveAbsence, {
        onSuccess: () => {
          toast.success("Leave / Absence Updated Successfully");
          navigate("/leave-absences");
        },
        onError: (error) => {
          console.error("Error Updating Leave / Absence:", error);
          toast.error("Failed to Update Leave / Absence. Please try again.");
        },
      })
      
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  }

  // delete leave / absence
  const handleDelete = () =>{
    try {
      deleteLeaveAbsence(id || "", {
        onSuccess: () => {
          toast.success("Leave / Absence Deleted Successfully");
          navigate("/leave-absences");
        },
        onError: (error) => {
          console.error("Error Deleting Attendance:", error);
          toast.error("Failed to Delete Attendance. Please try again.");
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
      <div className="flex flex-1 flex-col gap-4 p-4">
      <UpdateLeaveAbsenceForm
       startDate={startDate}
       setStartDate ={setStartDate}
       endDate={endDate}
       setEndDate={setEndDate}
       status={status}
       setStatus={setStatus}
       leaveType={leaveType}
       setLeaveType={setLeaveType}
       remarks={remarks}
       setRemarks={setRemarks}
       reasonForLeave={reasonForLeave}
       setReasonForLeave={setReasonForLeave}
       employeeId={employeeId}
       setEmployeeId={setEmployeeId}
       employees={employees}
       handleSubmit={handleSubmit}
       handleDelete={handleDelete}
       leaveAbsenceId= {id || ""}
      />
      </div>
   </MainLayout>   
  )
}

export default UpdateLeaveAbsence
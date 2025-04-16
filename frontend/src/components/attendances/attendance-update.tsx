import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { format } from "date-fns";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useDeleteAttendance, useGetAttendanceById, useUpdateAttendance } from "@/services/services-attendance";
import { useGetAllEmployees } from "@/services/services-employee";
import UpdateAttendanceForm from "./attendance-update-form";

const UpdateAttendance = () => {

  // get attendance ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch department & employee data
  const { data, isLoading } = useGetAttendanceById(id || "");
  const { mutate } = useUpdateAttendance(id || "");
  const { mutate: deleteAttendance } = useDeleteAttendance();
  const { data: employees } = useGetAllEmployees();

   // attendance data
  const [status, setStatus] = useState("");
  const [reasonForAbsence, setReasonForAbsence] = useState("");
  const [remarks, setRemarks] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [employeeId, setEmployeeId] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      setDate(data.date);
      setReasonForAbsence(data.reasonForAbsence);
      setStatus(data.status);
      setRemarks(data.remarks);
      setEmployeeId(data.employee.id);
    }
  }, [data]);

  if (isLoading) { return <div>Loading...</div>; }
  if (!data) { return <div>No data found</div>; }

  // update attendance
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!status || !employeeId) {
      toast.error("Please fill in all required fields");
      return;
    }

    const currentAttendance = {
      id: id || "",
      status,
      reasonForAbsence,
      date: date ? format(date, "MM-dd-yyyy") : undefined,
      remarks,
      employee : { id : employeeId }
    };

    try {
      mutate(currentAttendance, {
        onSuccess: () => {
          toast.success("Attendance Updated Successfully");
          navigate("/attendances");
        },
        onError: (error) => {
          console.error("Error Updating Attendance:", error);
          toast.error("Failed to Update Attendance. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // delete attendance
  const handleDelete = () => {
    try {
      deleteAttendance(id || "", {
        onSuccess: () => {
          toast.success("Attendance deleted successfully");
          navigate("/attendances");
        },
        onError: (error) => {
          console.error("Error deleting attendance:", error);
          toast.error("Failed to delete attendance. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Update Attendance" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <UpdateAttendanceForm
          status={status}
          setStatus={setStatus}
          reasonForAbsence={reasonForAbsence}
          setReasonForAbsence={setReasonForAbsence}
          remarks={remarks}
          setRemarks={setRemarks}
          date={date}
          setDate={setDate}
          employeeId={employeeId}
          setEmployeeId={setEmployeeId}
          employees={employees}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          attendanceId={id || ""}
        />
      </div>
    </MainLayout>
  );
};

export default UpdateAttendance;
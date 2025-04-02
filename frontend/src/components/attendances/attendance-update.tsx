import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useDeleteAttendance, useGetAttendanceById, useUpdateAttendance } from "@/services/services-attendance";
import { useGetAllEmployees } from "@/services/services-employee";
import DeleteAttendanceDialog from "./attendance-delete";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
}

type Attendance = {
  id: string;
  status: string;
  reasonForAbsence: string;
  remarks: string;
  date: Date | undefined;
  employee: {
      id: number;
  };
}

const UpdateAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetAttendanceById(id || "");
  const { mutate } = useUpdateAttendance(id || "");
  const { mutate: deleteAttendance } = useDeleteAttendance();
  const { data: employees } = useGetAllEmployees();

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
      setRemarks(data.remarks)
      setEmployeeId(data.employee.id);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }

    const currentAttendance: Attendance = {
      id: id || "",
      status,
      reasonForAbsence,
      date,
      remarks,
      employee: { id: employeeId },
    };

    try {
      mutate(currentAttendance, {
        onSuccess: () => {
          toast.success("Attendance updated successfully");
          navigate("/attendances");
        },
        onError: (error) => {
          console.error("Error updating attendance:", error);
          toast.error("Failed to update attendance. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

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
        <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="status">Leave Status:</Label>
              <Input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />

              <Label htmlFor="employee">Employee:</Label>
              <Select
                value={employeeId ? employeeId.toString() : undefined}
                onValueChange={(value) => {
                  const parsedValue = parseInt(value);
                  if (!isNaN(parsedValue)) {
                    setEmployeeId(parsedValue);
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees?.map((employee: Employee) => (
                    <SelectItem key={employee.id} value={employee.id.toString()}>
                      {employee.firstName} {employee.lastName} - {employee.employeeNumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label htmlFor="date">Date:</Label>
              <Input
                type="date"
                id="date"
                value={date ? format(date, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  if (selectedDate && selectedDate > new Date()) {
                    toast.error("Date cannot be in the future.");
                    return;
                  }
                  setDate(selectedDate);
                }}
              />

              <Label htmlFor="reasonForAbsence">Reason For Absence:</Label>
              <Textarea
                id="reasonForAbsence"
                value={reasonForAbsence}
                onChange={(e) => setReasonForAbsence(e.target.value)}
              />
              <Label htmlFor="remarks">Remarks:</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          <div className="flex pl-4 mt-4">
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Attendance">Update</Button>
            <DeleteAttendanceDialog attendanceId={id || ""} onDelete={handleDelete} aria-label="Delete Attendance"/>
            <Link to={`/attendances`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default UpdateAttendance;
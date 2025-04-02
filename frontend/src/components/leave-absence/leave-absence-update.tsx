import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useGetAllEmployees } from "@/services/services-employee";
import { useDeleteLeaveAttendance, useGetLeaveAttendanceById, useUpdateLeaveAttendance } from "@/services/services-leave-absence";
import DeleteLeaveAbsenceDialog from "./leave-absence-delete";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
}

type LeaveAbsence  = {
  id:string;
  startDate: Date;
  endDate: Date;
  leaveType: string;
  status: string;
  reasonForLeave: string;
  remarks:string;
  employee: {
    id: number;
};
}

const UpdateLeaveAbsence = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetLeaveAttendanceById(id || "");
  const { mutate } = useUpdateLeaveAttendance(id || "");
  const { mutate: deleteLeaveAbsence } = useDeleteLeaveAttendance();
  const { data: employees } = useGetAllEmployees();

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

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();

    if (employeeId === null) {
      toast.error("Please select an employee");
      return;
    }

    const currentLeaveAttendance: LeaveAbsence ={
      id: id || "",
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      leaveType,
      status,
      reasonForLeave,
      remarks,
      employee : { id : employeeId }
    }

    try {
      mutate(currentLeaveAttendance, {
        onSuccess: () => {
          toast.success("Leave / Absence updated successfully");
          navigate("/leave-absences");
        },
        onError: (error) => {
          console.error("Error updating Leave / Absence:", error);
          toast.error("Failed to update Leave / Absence. Please try again.");
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
          toast.success("Leave / Absence deleted successfully");
          navigate("/leave-absences");
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
  }

  return (
    <MainLayout>
      <Headers Title="Update Leave / Absence" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="leaveType">Leave Type:</Label>
              <Input type="text" id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required />
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
              <Label htmlFor="status">Status:</Label>
              <Input type="text" id="status" value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>

            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="startDate">Start Date:</Label>
              <Input type="date" id="startDate" value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  setStartDate(selectedDate);
                }}
              />
              <Label htmlFor="endDate">End Date:</Label>
              <Input type="date" id="endDate" value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  setEndDate(selectedDate);
                }}
              />
              <Label htmlFor="reasonForLeave">Reason For Leave:</Label>
              <Input type="text" id="reasonForLeave"  value={reasonForLeave} onChange={(e) => setReasonForLeave(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="remarks">Remarks:</Label>
              <Textarea id="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} maxLength={500}></Textarea>
            </div>
          </div>
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Leave / Absence">Update</Button>
            <DeleteLeaveAbsenceDialog leaveAbsenceId={id || ""} onDelete={handleDelete} aria-label="Delete Leave / Absence"/>
            <Link to={`/leave-absences`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back to Leave / Absence</Button>
            </Link>
          </div>
        </form>
      </div>
   </MainLayout>   
  )
}

export default UpdateLeaveAbsence
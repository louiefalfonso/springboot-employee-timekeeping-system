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
import { useGetLeaveAttendanceById, useUpdateLeaveAttendance, useDeleteAttendance } from "@/services/services-leave-absence";


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
  const { mutate: leaveAttendance } = useDeleteAttendance();
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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data found</div>;
  }


  return (
    <MainLayout>
      <Headers Title="Update Leave / Absence" />
      <div className="flex flex-1 flex-col gap-4 p-4"></div>
   </MainLayout>   
  )
}

export default UpdateLeaveAbsence
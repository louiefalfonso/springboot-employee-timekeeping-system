import { useParams, useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetAttendancetById, useUpdateAttendance } from "@/services/services-attendance";
import { useGetAllEmployees } from "@/services/services-employee";

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
    date: Date | undefined;
    employeeId: number;
}

const UpdateAttendance = () => {

  // get employee ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

   // fetch employee data
   const { data, isLoading } = useGetAttendancetById(id || "");
   const { mutate } = useUpdateAttendance(id || "");
   const { data: employees } = useGetAllEmployees();

   const [status, setStatus] = useState("");
   const [reasonForAbsence, setReasonForAbsence] = useState("");
   const [date, setDate] = useState<Date | undefined>();
   const [employeeId, setEmployeeId] = useState<number | null>(null);

   // set attendance data
   useEffect(()=>{
    if(data){
        setDate(data.date);
        setReasonForAbsence(data.reasonForAbsence);
        setStatus(data.status);
        setEmployeeId(data.employeeId);
        console.log("Fetched employeeId:", data.employeeId);
    }
   }, [data])

    // end set employee data
    if (isLoading) { return <div>Loading...</div>;}
    if (!data) { return <div>No data found</div>;}

    // update attendance
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(employeeId === null){
            toast.error("Please select an employee")
            return;
        }

        const currentAttendance : Attendance = {
            id: id || "",
            status: status,
            reasonForAbsence: reasonForAbsence,
            date: date,
            employeeId: employeeId
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
    }

  return (
    <MainLayout>
      <Headers Title="Update Attendance" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="Status">Leave Status:</Label>
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
                        setEmployeeId(parseInt(value));
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
                      toast.error("Date of birth cannot be in the future.");
                      return;
                    }
                    setDate(selectedDate);
                  }}
                />
                <Label htmlFor="reasonForAbsence">Reason For Absence:</Label>
                <Textarea id="reasonForAbsenc"  value={reasonForAbsence} onChange={(e) => setReasonForAbsence(e.target.value)}/>
            </div>
          </div>
          <div className="flex pl-4 mt-4 ">
            <Link to={`/attendances`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Employees</Button>  
            </Link>
          </div>
        </form>
      </div>
   </MainLayout>  
  )
}

export default UpdateAttendance
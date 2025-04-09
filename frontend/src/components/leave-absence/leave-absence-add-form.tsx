import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
};

type LeaveAbsence = {
    id?:string;
    startDate?: string;
    endDate?: string;
    leaveType?: string;
    status?: string;
    reasonForLeave?: string;
    remarks?:string; 
    employee: Employee | null;
} 

interface LeaveAbsenceProps {
    employees: Employee[];
    onSubmit : (leaveAbsence: LeaveAbsence) => void;
}

const AddLeaveAbsenceForm: React.FC<LeaveAbsenceProps> = ({ employees, onSubmit }) => {
    
    const [leaveType, setLeaveType] = useState("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [status, setStatus] = useState("");
    const [reasonForLeave, setReasonForLeave] = useState("");
    const [remarks, setRemarks] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

    const handleEmployeeSelect = useCallback((employeeId: number) => {
        const employee = employees.find((employee) => employee.id === employeeId) || null;
        setSelectedEmployee(employee);
      }, [employees]);
    
    const newLeaveAbsence = useMemo<LeaveAbsence>(
        ()=>({
           leaveType,
           startDate: startDate ? format(startDate, "MM-dd-yyyy") : undefined,
           endDate: endDate ? format(endDate, "MM-dd-yyyy") : undefined,
           status,
           reasonForLeave,
           remarks,
           employee: selectedEmployee,
        }),
        [leaveType, startDate, endDate, status, reasonForLeave, remarks, selectedEmployee]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEmployee) {
        toast.error("Please select an employee");
        return;
        }
        onSubmit(newLeaveAbsence);
    }

  return (
    <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-2">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="leaveType">Leave Type:</Label>
              <Input type="text" id="leaveType" placeholder="Leave Type" onChange={(e) => setLeaveType(e.target.value)} required />
              <Label htmlFor="employee">Employee:</Label>
              <Select onValueChange={(value) => handleEmployeeSelect(parseInt(value))}>
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
              <Input type="text" id="status" placeholder="Status" onChange={(e) => setStatus(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="startDate">Start Date:</Label>
              <Input type="date" id="startDate" value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : null;
                  setStartDate(selectedDate);
                }}
              />
              <Label htmlFor="endDate">End Date:</Label>
              <Input type="date" id="endDate" value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : null;
                  setEndDate(selectedDate);
                }}
              />
              <Label htmlFor="reasonForLeave">Reason For Leave:</Label>
              <Input type="text" id="reasonForLeave" placeholder="Reason For Leave" onChange={(e) => setReasonForLeave(e.target.value)} />
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="remarks">Remarks:</Label>
              <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} maxLength={500}></Textarea>
            </div>
          </div>
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
              Add New Leave / Absence
            </Button>
            <Link to={`/leave-absences`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
          </div>
        </form>
  )
}

export default AddLeaveAbsenceForm
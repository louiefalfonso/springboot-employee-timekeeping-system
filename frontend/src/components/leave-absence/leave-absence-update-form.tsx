import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteLeaveAbsenceDialog from "./leave-absence-delete";

type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    employeeNumber: string;
};

type LeaveAbsenceFormProps = {
    startDate: Date | undefined;
    setStartDate: (value: Date | undefined) => void;
    endDate: Date | undefined;
    setEndDate: (value: Date | undefined) => void;
    status: string;
    setStatus: (value: string) => void;
    leaveType: string;
    setLeaveType: (value: string) => void;
    remarks: string;
    setRemarks: (value: string) => void;
    reasonForLeave: string;
    setReasonForLeave: (value: string) => void;
    employeeId: number | null;
    setEmployeeId: (value: number | null) => void;
    employees: Employee[] | undefined;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    leaveAbsenceId: string;
}

const UpdateLeaveAbsenceForm: React.FC<LeaveAbsenceFormProps> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    leaveType,
    setLeaveType,
    remarks,
    setRemarks,
    reasonForLeave,
    setReasonForLeave,
    employeeId,setEmployeeId,employees,
    handleSubmit,handleDelete,leaveAbsenceId,
}) => {
  return (
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
                    {employees ? (
                        employees.map((employee: Employee) => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                            {employee.firstName} {employee.lastName} - {employee.employeeNumber}
                        </SelectItem>
                        ))
                    ) : (
                        <SelectItem disabled value={""}>Loading employees...</SelectItem>
                    )}
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
            <DeleteLeaveAbsenceDialog leaveAbsenceId={leaveAbsenceId} onDelete={handleDelete} aria-label="Delete Leave / Absence"/>
            <Link to={`/leave-absences`}>
              <Button className="bg-gray-500 hover:bg-gray-600">Back</Button>
            </Link>
          </div>
      </form>
  )
}

export default UpdateLeaveAbsenceForm
import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteAttendanceDialog from "./attendance-delete";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
};

type AttendanceFormProps = {
  status: string;
  setStatus: (value: string) => void;
  reasonForAbsence: string;
  setReasonForAbsence: (value: string) => void;
  remarks: string;
  setRemarks: (value: string) => void;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  employeeId: number | null;
  setEmployeeId: (value: number | null) => void;
  employees: Employee[] | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  attendanceId: string;
};

const UpdateAttendanceForm: React.FC<AttendanceFormProps> = ({
  status, setStatus,
  reasonForAbsence,setReasonForAbsence,
  remarks,setRemarks,
  date,setDate,
  employeeId,setEmployeeId,employees,
  handleSubmit,handleDelete,attendanceId,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="employee">Employee:</Label>
          <Select value={employeeId ? employeeId.toString() : undefined}
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
        </div>
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="status">Leave Status:</Label>
          <Input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
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
        </div> 
      </div>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="reasonForAbsence">Reason For Absence:</Label>
          <Textarea
            id="reasonForAbsence"
            value={reasonForAbsence}
            onChange={(e) => setReasonForAbsence(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-4 p-4">
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
        <DeleteAttendanceDialog attendanceId={attendanceId} onDelete={handleDelete} aria-label="Delete Attendance"/>
        <Link to={`/attendances`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Attendance</Button>
        </Link>
      </div>
    </form>
  );
};

export default UpdateAttendanceForm;
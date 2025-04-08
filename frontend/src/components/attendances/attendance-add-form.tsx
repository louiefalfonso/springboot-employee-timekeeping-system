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

type Attendance = {
  id?: string;
  status?: string;
  reasonForAbsence?: string;
  date?: string;
  remarks?: string;
  employee: Employee | null;
};

interface AttendanceFormProps {
  employees: Employee[];
  onSubmit: (attendance: Attendance) => void;
}

const AttendanceForm: React.FC<AttendanceFormProps> = ({ employees, onSubmit }) => {
  const [status, setStatus] = useState("");
  const [reasonForAbsence, setReasonForAbsence] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [remarks, setRemarks] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEmployeeSelect = useCallback((employeeId: number) => {
    const employee = employees.find((employee) => employee.id === employeeId) || null;
    setSelectedEmployee(employee);
  }, [employees]);

  const newAttendance = useMemo<Attendance>(
    () => ({
      status,
      reasonForAbsence,
      date: date ? format(date, "MM-dd-yyyy") : undefined,
      employee: selectedEmployee,
      remarks,
    }),
    [status, reasonForAbsence, date, selectedEmployee, remarks]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    onSubmit(newAttendance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid auto-rows-min md:grid-cols-3">
        <div className="grid w-full items-center gap-4 p-4">
          <Label htmlFor="Status">Leave Status:</Label>
          <Input
            type="text"
            id="status"
            placeholder="Status"
            onChange={(e) => setStatus(e.target.value)}
          />
          <Label htmlFor="employee">Employee:</Label>
          <Select onValueChange={(value) => handleEmployeeSelect(parseInt(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Employee" />
            </SelectTrigger>
            <SelectContent>
              {employees.map((employee) => (
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
          <Textarea
            id="reasonForAbsence"
            placeholder="Reason For Absence"
            onChange={(e) => setReasonForAbsence(e.target.value)}
          />
          <Label htmlFor="remarks">Remarks:</Label>
          <Textarea
            id="remarks"
            placeholder="Remarks"
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>
      <div className="flex pl-4 mt-4">
        <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
          Add Attendance
        </Button>
        <Link to={`/attendances`}>
            <Button className="bg-gray-500 hover:bg-gray-600">Back to Attendance</Button>
        </Link>
      </div>
    </form>
  );
};

export default AttendanceForm;

import { useMemo, useState, useCallback } from "react";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useGetAllEmployees } from "@/services/services-employee";
import { useAddLeaveAbsence } from "@/services/services-leave-absence";

type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
};

type LeaveAbsence = {
  id?: number;
  leaveType: string;
  reasonForLeave: string;
  remarks: string;
  status: string;
  startDate?: string;
  endDate?: string;
  employee: Employee | null;
};

const AddNewLeaveAbsence = () => {

   // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddLeaveAbsence();
  const { data: employees } = useGetAllEmployees();

  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [status, setStatus] = useState<string>("");
  const [reasonForLeave, setReasonForLeave] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEmployeeSelect = useCallback((employeeId: number) => {
    const employee = employees?.find((employee: { id: number; }) => employee.id === employeeId) || null;
    setSelectedEmployee(employee);
  }, [employees]);

  // Memoize the newLeaveAttendance object
  const newLeaveAbsence = useMemo<LeaveAbsence>(
    () => ({
      leaveType, reasonForLeave, remarks, status,
      startDate: startDate ? format(startDate, "MM-dd-yyyy") : undefined,
      endDate: endDate ? format(endDate, "MM-dd-yyyy") : undefined,
      employee: selectedEmployee,
    }),
    [leaveType, reasonForLeave, remarks, status, startDate, endDate, selectedEmployee]
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }

    try {
      mutate(newLeaveAbsence, {
        onSuccess: () => {
          toast.success("Leave / Absence added successfully");
          navigate("/leave-absences");
        },
        onError: (error) => {
          console.error("Error adding Leave / Absence:", error);
          toast.error("Failed to add Leave / Absence.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add New Leave / Absence" />
      <div className="flex flex-1 flex-col gap-4 p-4">
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
      </div>
    </MainLayout>
  );
};

export default AddNewLeaveAbsence;

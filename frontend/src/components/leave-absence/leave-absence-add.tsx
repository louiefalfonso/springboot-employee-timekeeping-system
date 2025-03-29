import { useMemo, useState } from "react";
import { format } from "date-fns";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

import { useGetAllEmployees } from "@/services/services-employee";
import { useAddLeaveAttendance } from "@/services/services-leave-absence";

// define a type for employee
type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;
}

const AddNewLeaveAbsence = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddLeaveAttendance();
  const { data: employees } = useGetAllEmployees();

  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [status, setStatus] = useState("");
  const [reasonForLeave, setReasonForLeave] = useState("");
  const [remarks, setRemarks] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEmployeeSelect = (employeeId: number) => {
    const employee = employees?.find(emp => emp.id === employeeId) || null;
    setSelectedEmployee(employee);
  };

  // Memoize the newLeaveAbsence object
  const newLeaveAttendance = useMemo(
    () => ({
      leaveType, 
      reasonForLeave, 
      remarks, 
      status,
      startDate: startDate ? format(startDate, "MM-dd-yyyy") : undefined,
      endDate: endDate ? format(endDate, "MM-dd-yyyy") : undefined,
      employee: selectedEmployee,

    }),
    [
      leaveType, 
      reasonForLeave, 
      remarks, 
      status, 
      startDate, 
      endDate, 
      selectedEmployee]
  );

  // Inside the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!selectedEmployee){
      toast.error("Please select an employee")
      return;
    }

    try {
      mutate(newLeaveAttendance, {
        onSuccess: () => {
          toast.success("Attendance added successfully");
          navigate("/leave-absences");

        },
        onError: (error) => {
          toast.error(error.message);
          console.error("Error adding attendance:", error);
        },
      });
    } catch (error) {
      toast.error(error.message);
      console.error("Unexpected error:", error);
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
              <Input type="text" id="leaveType" placeholder="Leave Type" onChange={(e) => setLeaveType(e.target.value)}/>

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
                <Input type="text" id="status" placeholder="Leave Type" onChange={(e) => setStatus(e.target.value)}/>
                

            </div>

            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="startDate">Start Date:</Label>
                <Input type="date" id="startDate" value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    if (selectedDate && selectedDate > new Date()) {
                      toast.error("Start Date cannot be in the future.");
                      return;
                    }
                    setStartDate(selectedDate);
                  }}
                />
                <Label htmlFor="endDate">End Date:</Label>
                <Input type="date" id="endDate" value={endDate ? format(endDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                    if (selectedDate && selectedDate > new Date()) {
                      toast.error("End Date cannot be in the future.");
                      return;
                    }
                    setEndDate(selectedDate);
                  }}
                />
                <Label htmlFor="reasonForLeave">Reason For Leave:</Label>
                <Input type="text" id="reasonForLeave" placeholder="Reason For Leave" onChange={(e) => setReasonForLeave(e.target.value)}/>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="remarks">Remarks:</Label>
              <Textarea id="remarks" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}></Textarea>

            </div>
          </div>
        </form>
      </div>
    </MainLayout>  
  )
}

export default AddNewLeaveAbsence
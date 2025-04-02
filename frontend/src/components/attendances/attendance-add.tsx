import { useMemo, useState, useCallback } from "react";
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

import { useAddNewAttendance } from "@/services/services-attendance";
import { useGetAllEmployees } from "@/services/services-employee";

// define a type for employee
type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  employeeNumber: string;

}

type Attendance = {
  id?:number;
  status?: string;
  reasonForAbsence?: string;
  date?: string;
  remarks?: string;
  employee: Employee | null;
}

const AddNewAttendance = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewAttendance();
  const { data: employees } = useGetAllEmployees();

  const [status, setStatus] = useState("");
  const [reasonForAbsence, setReasonForAbsence] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [remarks, setRemarks] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleEmployeeSelect = useCallback((employeeId: number) => {
    const employee = employees?.find((employee: { id: number; }) => employee.id === employeeId) || null;
    setSelectedEmployee(employee);
  }, [employees]);

  // Memoize the newAttendance object
  const newAttendance = useMemo<Attendance>(
    () => ({
      status,
      reasonForAbsence,
      date: date ? format(date, "MM-dd-yyyy") : undefined,
      employee: selectedEmployee,
      remarks
    }),
    [ status, reasonForAbsence, date, selectedEmployee, remarks ]
  );

  // Inside the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!selectedEmployee){
      toast.error("Please select an employee")
      return;
    }

    try {
      mutate(newAttendance, {
        onSuccess: () => {
          toast.success("Attendance added successfully");
          navigate("/attendances");

        },
        onError: (error) => {
          console.error("Error adding Attendance:", error);
          toast.error("Failed to add Attendance.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add New Attendance" />
      <div className="flex flex-1 flex-col gap-4 p-4">
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
                <Textarea id="reasonForAbsenc"  placeholder="Reason For Absence" onChange={(e) => setReasonForAbsence(e.target.value)}/>
                <Label htmlFor="remarks">Remarks:</Label>
                <Textarea id="remarks"  placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)}/>
            </div>
          </div>
          <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
                Add Attendance
            </Button>
            <Link to={`/attendances`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Employees</Button>  
            </Link>
          </div>
        </form>
      </div>
   </MainLayout>   
  )
}

export default AddNewAttendance
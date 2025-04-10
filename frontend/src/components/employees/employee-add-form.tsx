import React, { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Department = {
    id: number;
    departmentName: string;
};

type Employee = {
    id?: string;
    firstName?: string;
    lastName?: string;
    employeeNumber?: string;
    emailAddress?: string;
    position?: string;
    phoneNumber?: string;
    dateOfBirth?: string;
    employeeStatus?: string;
    department: Department | null;
}

interface EmployeeFormProps{
    departments: Department[];
    onSubmit: (employee: Employee) => void;
}

export const AddNewEmployeeForm: React.FC<EmployeeFormProps> = ({departments, onSubmit}) => {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleDepartmentSelect = useCallback((departmentId: number) => {
    const department = departments.find((department) => department.id === departmentId) || null;
    setSelectedDepartment(department);
  }, [departments]);

  const newEmployee = useMemo<Employee>(
    () => ({
        
        firstName, lastName, employeeNumber, emailAddress, position, phoneNumber, employeeStatus,
        dateOfBirth: dateOfBirth ? format(dateOfBirth, "MM-dd-yyyy") : undefined, 
        department: selectedDepartment,

    }),
    [firstName, lastName, employeeNumber, emailAddress, position, phoneNumber, employeeStatus, dateOfBirth, selectedDepartment]
  );

  const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault();

    if (!selectedDepartment) {
        toast.error("Please Select a Department");
        return;
    }

    onSubmit(newEmployee);
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label htmlFor="department">Department:</Label>
              <Select onValueChange={(value) => handleDepartmentSelect(parseInt(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments?.map((department: Department) => (
                    <SelectItem key={department.id} value={department.id.toString()}>
                      {department.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="emailAddress">Email Address:</Label>
              <Input
                type="email"
                id="emailAddress"
                placeholder="Email Address"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <Label htmlFor="employeeNumber">Employee Number:</Label>
              <Input
                type="text"
                id="employeeNumber"
                placeholder="Employee Number"
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
              <Label htmlFor="position">Role / Position:</Label>
              <Input
                type="text"
                id="position"
                placeholder="Role / Position"
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="dateOfBirth">Date Of Birth:</Label>
              <Input
                type="date"
                id="dateOfBirth"
                value={dateOfBirth ? format(dateOfBirth, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                  if (selectedDate && selectedDate > new Date()) {
                    alert("Date of birth cannot be in the future.");
                    return;
                  }
                  setDateOfBirth(selectedDate);
                }}
              />
            <Label htmlFor="phoneNumber">Phone Number:</Label>
              <Input
                type="text"
                id="phoneNumber"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Label htmlFor="employeeStatus">Employee Status:</Label>
              <Input
                type="text"
                id="employeeStatus"
                placeholder="Employee Status"
                onChange={(e) => setEmployeeStatus(e.target.value)}
              />
            </div>
        </div>
        <div className="flex pl-4 mt-4 ">
            <Button type="submit" className="mr-4 bg-green-500 hover:bg-green-600">
                Add Employee
            </Button>
            <Link to={`/employees`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back</Button>  
            </Link>
        </div> 
   </form>
  )
}

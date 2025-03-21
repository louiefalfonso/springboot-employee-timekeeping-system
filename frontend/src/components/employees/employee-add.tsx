import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import { useAddNewEmployee } from "@/services/services-employee";
import { useGetAllDepartments } from "@/services/services-department";
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

// Define a type for the department
type Department = {
  id: number;
  departmentName: string;
};

const AddEmployee = () => {
  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewEmployee();
  const { data: departments } = useGetAllDepartments();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleDepartmentSelect = (departmentId: number) => {
    const department = departments?.find(dept => dept.id === departmentId) || null;
    setSelectedDepartment(department);
  };

  // Memoize the newEmployee object
  const newEmployee = useMemo(
    () => ({
      firstName,
      lastName,
      employeeNumber,
      emailAddress,
      position,
      phoneNumber,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "MM-dd-yyyy") : undefined,
      employeeStatus,
      department: selectedDepartment,
    }),
    [
      firstName,
      lastName,
      employeeNumber,
      emailAddress,
      position,
      phoneNumber,
      dateOfBirth,
      employeeStatus,
      selectedDepartment
    ]
  );

  // Inside the handleSubmit function
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDepartment) {
      alert("Please select a department");
      return;
    }

    try {
      mutate(newEmployee, {
        onSuccess: () => {
          navigate("/employees");
        },
        onError: (error) => {
          console.error("Error adding employee:", error);
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <MainLayout>
      <Headers Title="Add Employee" />
      <div className="flex flex-1 flex-col gap-4 p-4">
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
          <Button type="submit" className="mt-4 ml-4 bg-green-500 hover:bg-green-600">
              Add Employee
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddEmployee;
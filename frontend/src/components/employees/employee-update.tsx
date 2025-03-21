import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";
import { useGetEmployeeById, useUpdateEmployee } from "@/services/services-employee";
import { useGetAllDepartments } from "@/services/services-department";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Department = {
  id: number;
  departmentName: string;
  departmentCode: string;
  departmentHead: string;
};

type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  employeeNumber: string;
  departmentId: number;
  dateOfBirth: Date | undefined;
  emailAddress: string;
  position: string;
  phoneNumber: string;
  employeeStatus: string;
};

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetEmployeeById(id || "");
  const { mutate } = useUpdateEmployee(id || "");
  const { data: departments } = useGetAllDepartments();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [position, setPosition] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [departmentId, setDepartmentId] = useState<number | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmployeeNumber(data.employeeNumber);
      setDepartmentId(data.departmentId);
      setDateOfBirth(data.dateOfBirth);
      setEmailAddress(data.emailAddress);
      setPosition(data.position);
      setPhoneNumber(data.phoneNumber);
      setEmployeeStatus(data.employeeStatus);
    }
  }, [data]);

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (departmentId === null) {
      alert("Please select a department");
      return;
    }

    const currentEmployee: Employee = {
      id: id || "",
      firstName,
      lastName,
      employeeNumber,
      departmentId,
      dateOfBirth,
      emailAddress,
      position,
      phoneNumber,
      employeeStatus,
    };

    try {
      mutate(currentEmployee, {
        onSuccess: () => {
          navigate("/employees");
        },
        onError: (error) => {
          console.error("Error updating employee:", error);
          alert("Failed to update employee. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <MainLayout>
      <Headers Title="Update Employee" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <form onSubmit={handleSubmit}>
          <div className="grid auto-rows-min md:grid-cols-3">
            <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="firstName">First Name:</Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Label htmlFor="lastName">Last Name:</Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label htmlFor="department">Department:</Label>
              <Select onValueChange={(value) => setDepartmentId(parseInt(value))}>
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
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
              <Label htmlFor="employeeNumber">Employee Number:</Label>
              <Input
                type="text"
                id="employeeNumber"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
              <Label htmlFor="position">Role / Position:</Label>
              <Input
                type="text"
                id="position"
                value={position}
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
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Label htmlFor="employeeStatus">Employee Status:</Label>
              <Input
                type="text"
                id="employeeStatus"
                value={employeeStatus}
                onChange={(e) => setEmployeeStatus(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="mt-4 ml-4 bg-violet-500 hover:bg-violet-600">
            Update Employee
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default UpdateEmployee;
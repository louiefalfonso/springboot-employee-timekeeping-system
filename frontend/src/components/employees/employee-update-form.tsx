import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeleteEmployeeDialog from "./employee-delete"

type Department = {
    id: number;
    departmentName: string;
}

type EmployeeFormProps ={
  firstName:string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  employeeNumber: string; 
  setEmployeeNumber: (value: string) => void;
  emailAddress:string;
  setEmailAddress: (value: string) => void;
  position:string;
  setPosition: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  dateOfBirth: Date | undefined;
  setDateOfBirth: (value: Date | undefined) => void;
  employeeStatus: string;
  setEmployeeStatus: (value: string) => void;
  departmentId: number | null;
  setDepartmentId: (value: number | null) => void;
  departments: Department[] | undefined;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: () => void;
  employeeId: string;
}

export const UpdateEmployeeForm: React.FC<EmployeeFormProps> = ({
    firstName, setFirstName,
    lastName, setLastName,
    employeeNumber, setEmployeeNumber,
    emailAddress, setEmailAddress,
    position, setPosition,
    phoneNumber, setPhoneNumber,
    dateOfBirth, setDateOfBirth,
    employeeStatus, setEmployeeStatus,
    departmentId, setDepartmentId,departments,
    handleSubmit, handleDelete, employeeId
}) => {
  return (
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
              <Select value={departmentId ? departmentId.toString() : undefined}
                onValueChange={(value) => {
                  const parsedValue = parseInt(value);
                  if (!isNaN(parsedValue)) {
                    setDepartmentId(parsedValue);
                  }
                }}>
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
        <div className="flex pl-4">
            <Button type="submit" className="bg-violet-500 hover:bg-violet-600" aria-label="Update Employee">Update</Button>
            <DeleteEmployeeDialog employeeId={employeeId} onDelete={handleDelete} aria-label="Delete Employee"/>
            <Link to={`/employees`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back</Button>  
            </Link>
        </div>
    </form>
  )
}

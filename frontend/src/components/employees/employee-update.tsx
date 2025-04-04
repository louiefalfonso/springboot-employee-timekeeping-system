import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useGetEmployeeById, useUpdateEmployee, useDeleteEmployee } from "@/services/services-employee";
import { useGetAllDepartments } from "@/services/services-department";
import DeleteEmployeeDialog from "./employee-delete";

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

  // Declare state variables
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetEmployeeById(id || "");
  const { mutate } = useUpdateEmployee(id || "");
  const { mutate: deleteEmployee } = useDeleteEmployee();
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

  // set employee data
  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmployeeNumber(data.employeeNumber);
      setDepartmentId(data.department.id);
      setDateOfBirth(data.dateOfBirth);
      setEmailAddress(data.emailAddress);
      setPosition(data.position);
      setPhoneNumber(data.phoneNumber);
      setEmployeeStatus(data.employeeStatus);
      console.log(data.department.id)

    }
  }, [data]);

  // end set employee data
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

   // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (departmentId === null) {
      toast.error("Please select a department");
      return;
    }

    const currentEmployee: Employee = {
      id: id || "",
      firstName,
      lastName,
      employeeNumber,
      dateOfBirth,
      emailAddress,
      position,
      phoneNumber,
      employeeStatus,
      department: { id: departmentId },
    };

    try {
      mutate(currentEmployee, {
        onSuccess: () => {
          toast.success("Employee Updated Successfully");
          navigate("/employees");
        },
        onError: (error) => {
          console.error("Error Updating Employee:", error);
          toast.error("Failed to Update Employee. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // delete employee
  const handleDelete = () => {
    try {
      deleteEmployee(id || "", {
        onSuccess: () => {
          toast.success("Employee deleted successfully");
          navigate("/employees");
        },
        onError: (error) => {
          console.error("Error deleting employee:", error);
          toast.error("Failed to delete employee. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
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
            <DeleteEmployeeDialog employeeId={id || ""} onDelete={handleDelete} aria-label="Delete Employee"/>
            <Link to={`/employees`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back</Button>  
            </Link>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default UpdateEmployee;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetEmployeeById, useUpdateEmployee, useDeleteEmployee } from "@/services/services-employee";
import { useGetAllDepartments } from "@/services/services-department";
import { UpdateEmployeeForm } from "./employee-update-form";

const UpdateEmployee = () => {

  // get employee ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch employee & department data
  const { data, isLoading } = useGetEmployeeById(id || "");
  const { mutate } = useUpdateEmployee(id || "");
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const { data: departments } = useGetAllDepartments();

   // employee data
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
      setDepartmentId(data.department.id);
      setDateOfBirth(data.dateOfBirth);
      setEmailAddress(data.emailAddress);
      setPosition(data.position);
      setPhoneNumber(data.phoneNumber);
      setEmployeeStatus(data.employeeStatus);

    }
  }, [data]);

  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

   // update employee
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (departmentId === null) {
      toast.error("Please select a department");
      return;
    }

    const currentEmployee = {
      id: id || "",
      firstName,
      lastName,
      employeeNumber,
      dateOfBirth,
      emailAddress,
      position,
      phoneNumber,
      employeeStatus,
      department: { id: departmentId }
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
        <UpdateEmployeeForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        employeeNumber={employeeNumber}
        setEmployeeNumber={setEmployeeNumber}
        dateOfBirth={dateOfBirth}
        setDateOfBirth={setDateOfBirth}
        emailAddress={emailAddress}
        setEmailAddress={setEmailAddress}
        position={position}
        setPosition={setPosition}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        employeeStatus={employeeStatus}
        setEmployeeStatus={setEmployeeStatus}
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
        departments={departments}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        employeeId={id || ""}
        />
      </div>
    </MainLayout>
  );
};

export default UpdateEmployee;
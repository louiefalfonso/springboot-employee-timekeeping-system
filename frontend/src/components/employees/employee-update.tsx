import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetEmployeeById } from "@/services/services-employee";
import { useGetAllDepartments } from "@/services/services-department";
import { format } from "date-fns";

// Define a type for the department
type Department = {
  id: number;
  departmentName: string;
  departmentCode: string;
  departmentHead: string;
};

const UpdateEmployee = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeById(id || "");
  const { data: departments } = useGetAllDepartments();

  // Declare state variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>();

  // Update state variables when data is fetched
  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmployeeNumber(data.employeeNumber);
      setDepartmentId(data.departmentId);
      setDateOfBirth(data.dateOfBirth);
      const selectedDepartment = departments?.find((dept: Department) => dept.id === data.departmentId);
      setDepartmentName(selectedDepartment ? selectedDepartment.departmentName : "");
    }
  }, [data, departments]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data found</div>;
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update employee details
    console.log("Updated Employee:", { id, firstName, lastName, employeeNumber, departmentId, dateOfBirth });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="employeeNumber">Employee Number:</label>
          <input
            type="text"
            id="employeeNumber"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <select
            id="department"
            value={departmentId}
            onChange={(e) => {
              const selectedId = e.target.value;
              setDepartmentId(selectedId);
              const selectedDepartment = departments?.find((dept: Department) => dept.id === selectedId);
              setDepartmentName(selectedDepartment ? selectedDepartment.departmentName : "");
            }}
          >
            <option value="">Select a department</option>
            {departments?.map((department: Department) => (
              <option key={department.id} value={department.id}>
                {department.departmentName}
              </option>
            ))}
          </select>
          {departmentName && <p>Selected Department: {departmentName}</p>}
        </div>
        <div>
          <label htmlFor="dateOfBirth">Date Of Birth:</label>
          <input
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
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
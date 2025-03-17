
import MainLayout from "../layout/app-layout";
import Headers from "../layout/app-header";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewEmployee } from "../../services/EmployeeServices";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AddEmployee = () => {

  const navigate = useNavigate();
  const { mutate, data } = useAddNewEmployee();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("")
  const [position, setPosition] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [employeeStatus, setEmployeeStatus] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  const newEmployee = useMemo(() => ({
      id: "",
      firstName,
      lastName,
      employeeNumber,
      emailAddress,
      position,
      phoneNumber,
      employeeStatus,
      dateOfBirth
    }),
    [firstName, lastName, employeeNumber, emailAddress, position, phoneNumber, employeeStatus, dateOfBirth]
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) {return <div>No data found</div>;}

    try {
      mutate(newEmployee);
      navigate("/employees");
      window.location.reload(); 
      
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <MainLayout>
      <Headers Title="Add Employee" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid auto-rows-min md:grid-cols-2">
          <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="firstName">First Name:</Label>
              <Input type="firstName" id="firstName" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}/>
              <Label htmlFor="lastName">Last Name:</Label>
              <Input type="lasttName" id="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}/>  
              <Label htmlFor="emailAddress">Email Address:</Label>
              <Input type="emailAddress" id="emailAddress" placeholder="Email Address" onChange={(e) => setEmailAddress(e.target.value)}/>
              
          </div>
          <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="employeeNumber">Employee Number:</Label>
              <Input type="employeeNumber" id="employeeNumber" placeholder="Employee Number" onChange={(e) => setEmployeeNumber(e.target.value)}/>
              <Label htmlFor="position">Role / Position:</Label>
              <Input type="position" id="position" placeholder="Role / Position" onChange={(e) => setPosition(e.target.value)}/>
              <Label htmlFor="phoneNumber">Phone Number:</Label>
              <Input type="phoneNumber" id="phoneNumber" placeholder="Phone Number" onChange={(e) => setPhoneNumber(e.target.value)}/>
          </div>
        </div>
        </form>
      </div>  
  </MainLayout>
  );
};

export default AddEmployee;

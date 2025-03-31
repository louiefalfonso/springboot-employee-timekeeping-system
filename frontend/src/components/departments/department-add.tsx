import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import { toast } from "sonner";

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useAddNewDepartment } from "@/services/services-department";

const AddDepartment = () => {

  // Declare state variables
  const navigate = useNavigate();
  const { mutate } = useAddNewDepartment();

  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [departmentAssistant, setDepartmentAssistant] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  // Memoize the newDepartment object
  const newDepartment = useMemo(
    () => ({  departmentName, departmentCode,departmentHead, departmentAssistant, location, contactNumber}),
    [ departmentName, departmentCode, departmentHead, departmentAssistant, location, contactNumber ]
  );

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      mutate(newDepartment, {
        onSuccess: () => {
          toast.success("Department added successfully!");
          navigate("/departments");
        },
        onError: (error) => {
          console.error("Error adding department:", error);
          toast.error("Failed to add department.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred.");
    }
  }

  return (
    <MainLayout>
      <Headers Title="Add Department" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid auto-rows-min md:grid-cols-3">
          <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="departmentName">Department Name:</Label>
            <Input type="text" id="departmentName" onChange={(e) => setDepartmentName(e.target.value)}/>
            <Label htmlFor="departmentCode">Department Code:</Label>
            <Input type="text" id="departmentCode" onChange={(e) => setDepartmentCode(e.target.value)}/>
            <Label htmlFor="departmentHead">Department Head:</Label>
            <Input type="text" id="departmentHead" onChange={(e) => setDepartmentHead(e.target.value)}/>
          </div>
          <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="departmentAssistant">Department Assistant:</Label>
            <Input type="text" id="departmentAssistant" onChange={(e) => setDepartmentAssistant(e.target.value)}/>
            <Label htmlFor="location">Location:</Label>
            <Input type="text" id="location" onChange={(e) => setLocation(e.target.value)}/>
            <Label htmlFor="contactNumber">Contact Number:</Label>
            <Input type="text" id="contactNumber" onChange={(e) => setContactNumber(e.target.value)}/>
          </div>
        </div>
        <div className="flex pl-4 mt-4">
          <Button type="submit" className="mr-2 bg-green-500 hover:bg-green-600">Add Department</Button>
          <Link to={`/departments`}>
            <Button className ="bg-gray-500 hover:bg-gray-600">Back</Button>  
          </Link>
        </div>
      </form>
      </div>
    </MainLayout>
  )
}

export default AddDepartment
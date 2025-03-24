import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";


import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";
import DeleteDepartmentDialog from "./department-delete";
import { useGetDepartmentById, useUpdateDepertment, useDeleteDepartment} from "@/services/services-department";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Department = {
  id: string;
  departmentName: string;
  departmentCode: string;
  departmentHead: string;
  departmentAssistant: string;
  location: string;
  contactNumber: string;
};

const UpdateDepartment = () => {

  // get department ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  // fetch department data
  const { data, isLoading } = useGetDepartmentById(id || "");
  const { mutate } = useUpdateDepertment(id || "");
  const { mutate: deleteDepartment } = useDeleteDepartment();

  // department data
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [departmentHead, setDepartmentHead] = useState("");
  const [departmentAssistant, setDepartmentAssistant] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  useEffect(() => {
    if (data) {
      setDepartmentName(data.departmentName);
      setDepartmentCode(data.departmentCode);
      setDepartmentHead(data.departmentHead);
      setDepartmentAssistant(data.departmentAssistant);
      setLocation(data.location);
      setContactNumber(data.contactNumber);
    }
  }, [data]);

   // end set employee data
   if (isLoading) { return <div>Loading...</div>;}
   if (!data) { return <div>No data found</div>;}

   // update department
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();

     const currentDepartment : Department ={
      id: id || "",
      departmentName,
      departmentCode,
      departmentHead,
      departmentAssistant,
      location,
      contactNumber
     };

     try {
      mutate(currentDepartment, {
        onSuccess: () => {
          navigate("/departments");
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
   }

   const handleDelete = () =>{
    try {
      deleteDepartment(id || "", {
        onSuccess: () => {
          navigate("/departments");
        },
        onError: (error) => {
          console.error("Error deleting employee:", error);
          alert("Failed to delete employee. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again.");
    }
   }


  return (
    <MainLayout>
      <Headers Title="Update Department" />
      <div className="flex flex-1 flex-col gap-4 p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid auto-rows-min md:grid-cols-3">
          <div className="grid w-full items-center gap-4 p-4">
              <Label htmlFor="departmentName">Department Name:</Label>
              <Input type="text" id="departmentName" value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}/>
              <Label htmlFor="departmentCode">Department Code:</Label>
              <Input type="text" id="departmentCode" value={departmentCode}  onChange={(e) => setDepartmentCode(e.target.value)}/>
              <Label htmlFor="departmentHead">Department Head:</Label>
              <Input type="text" id="departmentHead" value={departmentHead} onChange={(e) => setDepartmentHead(e.target.value)}/>
          </div>
          <div className="grid w-full items-center gap-4 p-4">
            <Label htmlFor="departmentAssistant">Department Assistant:</Label>
            <Input type="text" id="departmentAssistant" value={departmentAssistant} onChange={(e) => setDepartmentAssistant(e.target.value)}/>
            <Label htmlFor="location">Location:</Label>
            <Input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)}/>
            <Label htmlFor="contactNumber">Contact Number:</Label>
            <Input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}/>
          </div>  
        </div>
        <div className="flex pl-4">
          <Button type="submit" className=" bg-violet-500 hover:bg-violet-600" aria-label="Update Employee">Update</Button>
            <DeleteDepartmentDialog departmentId={id || ""} onDelete={handleDelete} aria-label="Delete Department"/>
            <Link to={`/departments`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back</Button>  
            </Link>
          </div>
      </form>
      </div>
    </MainLayout>
  )
}

export default UpdateDepartment
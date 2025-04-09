import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DeleteDepartmentDialog from "./department-delete";

type DepartmentFormProps = {
    departmentName: string;
    setDepartmentName: (value: string) => void;
    departmentCode: string;
    setDepartmentCode: (value: string) => void;
    departmentHead: string;
    setDepartmentHead: (value: string) => void;
    departmentAssistant: string;
    setDepartmentAssistant: (value: string) => void;
    location: string;
    setLocation: (value: string) => void;
    contactNumber: string;
    setContactNumber: (value: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleDelete: () => void;
    departmentId: string;
}

const UpdateDepartmentForm: React.FC<DepartmentFormProps> = ({
    departmentName,setDepartmentName,
    departmentCode, setDepartmentCode,
    departmentHead, setDepartmentHead,
    departmentAssistant, setDepartmentAssistant,
    location, setLocation,
    contactNumber, setContactNumber,
    handleSubmit,handleDelete,departmentId
}) => {
  return (
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
              <DeleteDepartmentDialog departmentId={departmentId} onDelete={handleDelete} aria-label="Delete Department"/>
              <Link to={`/departments`}>
                <Button className ="bg-gray-500 hover:bg-gray-600">Back</Button>  
              </Link>
            </div>
        </form>
  )
}

export default UpdateDepartmentForm
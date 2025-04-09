import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";;
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Department = {
    id: string; 
    departmentName?: string;
    departmentCode?: string;
    departmentHead?: string;
    departmentAssistant?: string;
    location?:string;
    contactNumber?:string;
}
interface DepartmentProps {
    onSubmit: (department: Department) => void;
}

const AddDepartmentForm: React.FC<DepartmentProps> = ({onSubmit}) => {

    const [departmentName, setDepartmentName ] = useState("");
    const [departmentCode, setDepartmentCode ] = useState("");
    const [departmentHead, setDepartmentHead ] = useState("");
    const [departmentAssistant, setDepartmentAssistant ] = useState("");
    const [location, setLocation ] = useState("");
    const [contactNumber, setContactNumber ] = useState("");

    const newDepartment = useMemo<Department>(
        () => ({
            id: "", departmentName, departmentCode, departmentHead, departmentAssistant, location, contactNumber
        }),
        [departmentName, departmentCode, departmentHead, departmentAssistant, location, contactNumber] 
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(newDepartment);
    }

  return (
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
  )
}

export default AddDepartmentForm
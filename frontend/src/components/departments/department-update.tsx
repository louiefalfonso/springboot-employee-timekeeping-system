import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster} from "@/components/ui/sonner"
import { toast } from "sonner"

import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";

import { useGetDepartmentById, useUpdateDepertment, useDeleteDepartment} from "@/services/services-department";
import UpdateDepartmentForm from "./department-update-form";

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

     const currentDepartment = {
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
          toast.success("Department Updated Successfully");
          navigate("/departments");
        },
        onError: (error) => {
          console.error("Error Updating Employee:", error);
          toast.error("Failed to update employee. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
   }

   // delete department
   const handleDelete = () =>{
    try {
      deleteDepartment(id || "", {
        onSuccess: () => {
          toast.success("Department Deleted successfully");
          navigate("/departments");
        },
        onError: (error) => {
          console.error("Error updating department:", error);
          toast.error("Failed to update department. Please try again.");
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
   }

  return (
    <MainLayout>
      <Headers Title="Update Department" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <UpdateDepartmentForm
        departmentName={departmentName}
        setDepartmentName={setDepartmentName}
        departmentCode={departmentCode}
        setDepartmentCode={setDepartmentCode}
        departmentHead={departmentHead}
        setDepartmentHead={setDepartmentHead}
        departmentAssistant={departmentAssistant}
        setDepartmentAssistant={setDepartmentAssistant}
        location={location}
        setLocation={setLocation}
        contactNumber={contactNumber}
        setContactNumber={setContactNumber}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        departmentId={id || ""}
        />
      </div>
      <Toaster />
    </MainLayout>
  )
}

export default UpdateDepartment
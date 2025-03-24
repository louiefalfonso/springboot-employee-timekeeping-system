import { useParams } from "react-router-dom";
import { useGetEmployeeById } from "@/services/services-employee"
import { useGetAllDepartments } from "@/services/services-department";
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";
import CardComponent from "@/components/layout/app-card";

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const EmployeeDetails = () => {

  // Declare state variables
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeById(id || "");
  const { data: departments } = useGetAllDepartments();

  // Handle loading state
    if (isLoading) {return <div>Loading...</div>;}
    if (!data) {return <div>No data found</div>;}

  return (
    <MainLayout>
      <Headers Title="Employee Details"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <CardComponent
            Title="Complete Employee Details"
            Description="Employee details"
          >
            <p>Employee Number: {data.employeeNumber}</p>
            <p>Full Name: {data.firstName} {data.lastName}</p>
            <p>Department: {data.department.departmentName}</p>
            <p>Status: {data.employeeStatus}</p>
            <p>Role / Position: {data.position}</p>
            <p>Email Address: {data.emailAddress}</p>
            <p>Date of Birth: {data.dateOfBirth}</p>
          </CardComponent>
          <CardComponent
            Title="Department Details"
            Description="Employee department details"
          >
           <p>Department: {data.department.departmentName}</p> 
           <p>Department Code: {data.department.departmentCode}</p>
           <p>Department Head: {data.department.departmentHead}</p>
           <p>Department Assistant: {data.department.departmentAssistant}</p>  
           <p>Location: {data.department.location}</p>   
           <p>Contact Number: {data.department.contactNumber}</p>     
          </CardComponent>
        </div>
        <div className="flex">
            <Link to={`/employees`}>
              <Button className ="bg-gray-500 hover:bg-gray-600">Back to Employees</Button>  
            </Link>
          </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetails
import { useParams } from "react-router-dom";

import { useGetEmployeeById } from "@/services/services-employee"
import MainLayout from "@/components/layout/app-layout";
import Headers from "@/components/layout/app-header";
import CardComponent from "@/components/layout/app-card";

const EmployeeDetails = () => {

  // Declare state variables
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeById(id || "");

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
            <p>Employee First Name: {data.firstName}</p>
            <p>Employee Last Name: {data.lastName}</p>
            <p>Employee Department: {data.department.departmentName}</p>
            <p>Employment Status: {data.employeeStatus}</p>
            <p>Role / Position: {data.position}</p>
            <p>Email Address: {data.emailAddress}</p>
            <p>Phone Number: {data.phoneNumber}</p>
          </CardComponent>
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetails
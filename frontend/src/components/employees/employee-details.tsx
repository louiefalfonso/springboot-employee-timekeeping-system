import { useParams } from "react-router-dom";
import { useGetEmployeeById } from "@/services/EmployeeServices"
import MainLayout from "../layout/app-layout";
import Headers from "../layout/app-header";

const EmployeeDetails: React.FC = () => {
  // Declare state variables
  const { id } = useParams();
  const { data, isLoading } = useGetEmployeeById(id || "");

  // Handle loading state
    if (isLoading) {return <div>Loading...</div>;}
    if (!data) {return <div>No data found</div>;}

  return (
    <MainLayout>
      <Headers>
        <h1>Employee Details</h1>
      </Headers>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <p>Employee Number: {data.employeeNumber}</p>
          <p>Employee First Name: {data.firstName}</p>
          <p>Employee Last Name: {data.lastName}</p>
          <p>Employee Department: {data.department.departmentName}</p>
          <p>Status: {data.employeeStatus}</p>
          <p>Role / Position: {data.position}</p>
          <p>Email Address: {data.emailAddress}</p>
          <p>Phone Number: {data.phoneNumber}</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default EmployeeDetails
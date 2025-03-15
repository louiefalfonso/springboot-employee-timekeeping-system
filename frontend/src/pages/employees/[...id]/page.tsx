import EmployeeDetails from "@/components/employees/employee-details";
import { useParams } from "react-router-dom";

const EmployeePage = () => {

  // Get the asset ID from the URL
  const { id } = useParams();

  return (
    <>
        <EmployeeDetails employeeId={id}/>
    </>
  )
}

export default EmployeePage
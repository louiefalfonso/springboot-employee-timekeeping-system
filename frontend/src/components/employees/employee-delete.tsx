import { useNavigate, useParams } from "react-router-dom";
import { useDeleteEmployee, useGetEmployeeById } from "@/services/services-employee"
const DeleteEmployee = () => {

    // Declare state variables
    const { id } = useParams();
    const navigate = useNavigate();
    const { mutate } = useDeleteEmployee();
    const { data, isLoading } = useGetEmployeeById(id || "");

    // Handle loading state
    if (isLoading) {return <div>Loading...</div>;}
    if (!data) {return <div>No data found</div>;}

    // Handle Delete
    const handleDelete = () => {
        try {
            if (id) {
                mutate(id);
                navigate("/employees");
                window.location.reload();
            } else {
                console.error("Employee Id is Undefined");
            }
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <>
      <h1>Delete Asset</h1>
      <p>Are you sure you want to delete this employee?</p>
      <button>Delete Employee</button>
    </>
  )
}

export default DeleteEmployee
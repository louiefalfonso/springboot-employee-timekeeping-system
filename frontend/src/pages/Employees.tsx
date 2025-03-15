import EmployeeList from "@/components/employees/EmployeeList";
import MainLayout from "@/components/layout/app-layout"

const Employees = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1>Employees</h1>
          <EmployeeList />
        </div>
      </MainLayout>
    </>
  );
}

export default Employees
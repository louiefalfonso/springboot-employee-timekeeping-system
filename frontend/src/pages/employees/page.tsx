import EmployeeList from "@/components/employees/employee-list";
import MainLayout from "@/components/layout/app-layout"
import Headers from "@/components/layout/app-header";

const Employees = () => {
  return (
    <MainLayout>
      <Headers Title="Employee List" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <EmployeeList />
        </div>
      </div>
    </MainLayout>
  );
}
export default Employees
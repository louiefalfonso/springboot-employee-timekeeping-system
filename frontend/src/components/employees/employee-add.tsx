import MainLayout from "../layout/app-layout";
import Headers from "../layout/app-header";

const AddEmployee = () => {
  return (
    <MainLayout>
      <Headers>
        <h1>Add Employee</h1>
      </Headers>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          Add Employee
        </div>
      </div>
    </MainLayout>
  );
};

export default AddEmployee
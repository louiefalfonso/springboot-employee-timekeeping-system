import MainLayout from '@/components/layout/app-layout'
import Headers from "@/components/layout/app-header";
import DepartmentList from '@/components/departments/department-list';

const Departments = () => {
  return (
    <MainLayout>
        <Headers Title ="Department List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <DepartmentList/>
            </div>
         </div>   
    </MainLayout>
  )
}

export default Departments
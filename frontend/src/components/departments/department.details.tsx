import MainLayout from "@/components/layout/app-layout"
import Headers from "@/components/layout/app-header";

const DepartmentDetails = () => {
  return (
    <MainLayout>
        <Headers Title ="Department Details"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            </div>
        </div>
    </MainLayout>
  )
}

export default DepartmentDetails
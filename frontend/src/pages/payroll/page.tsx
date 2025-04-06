import MainLayout from '@/components/layout/app-layout'
import Headers from "@/components/layout/app-header"
import PayrollList from '@/components/payroll/payroll-list'
const Payrolls = () => {
  return (
    <MainLayout>
      <Headers Title ="Payroll List"/>
      <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <PayrollList/>
            </div>
       </div>     
    </MainLayout>  
  )
}

export default Payrolls
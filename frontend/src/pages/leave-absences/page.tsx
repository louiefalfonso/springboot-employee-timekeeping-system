import MainLayout from '@/components/layout/app-layout'
import Headers from "@/components/layout/app-header";
import LeaveAbsenceList from '@/components/leave-absence/leave-absence-list';

const LeaveAbsences = () => {
  return (
    <MainLayout>
      <Headers Title ="Leave & Absences List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
              <LeaveAbsenceList/>
            </div>
        </div>      
    </MainLayout>
  )
}

export default LeaveAbsences
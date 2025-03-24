import MainLayout from '@/components/layout/app-layout'
import Headers from "@/components/layout/app-header";
import AttendanceList from '@/components/attendances/attendance-list';

const Attendances = () => {
  return (
    <MainLayout>
        <Headers Title ="Attendance List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
               <AttendanceList/>
            </div>
         </div>   
    </MainLayout>
  )
}

export default Attendances
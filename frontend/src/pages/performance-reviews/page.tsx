import MainLayout from '@/components/layout/app-layout'
import Headers from "@/components/layout/app-header";
import PerformanceReviewList from '@/components/performance-review/performance-list';

const PerformaceReviews = () => {
  return (
   <MainLayout>
    <Headers Title ="Performance Review List"/>
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <PerformanceReviewList/>
      </div>
     </div>       
   </MainLayout>
  )
}

export default PerformaceReviews
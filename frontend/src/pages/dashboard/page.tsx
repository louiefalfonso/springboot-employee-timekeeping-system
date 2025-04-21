import MainLayout from "@/components/layout/app-layout"
import Headers from "@/components/layout/app-header";
import DashboardCardList from "@/components/layout/card-lists";
import DashboardChartItem from "@/components/layout/chart-item";

const Dashboard = () => {
  return (
      <MainLayout>
        <Headers Title="Dashboard"/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DashboardCardList/> 
              <div className="px-4 lg:px-6">
                <DashboardChartItem/>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}

export default Dashboard
import MainLayout from "@/components/layout/app-layout"
import Headers from "@/components/layout/app-header";

const Dashboard = () => {
  return (
    <>
      <MainLayout>
        <Headers Title="Dashboard"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="aspect-video rounded-xl bg-muted/50">
              <h1>Dashboard</h1>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Dashboard
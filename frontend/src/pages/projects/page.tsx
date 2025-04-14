import MainLayout from '@/components/layout/app-layout'
import Headers from "@/components/layout/app-header";
import ProjectLists from '@/components/projects/project-list';

const ProjectsPage = () => {
  return (
    <MainLayout>
        <Headers Title ="Project List"/>
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                <ProjectLists/>
            </div>
         </div>  
    </MainLayout> 
  )
}

export default ProjectsPage
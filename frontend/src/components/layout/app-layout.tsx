import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from './app-sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout
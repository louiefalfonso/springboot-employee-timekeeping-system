import { ReactNode } from 'react';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import AppSidebar from './app-sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};  

export default MainLayout
import { Home, ContactRound, Building2, FileClock, NotebookPen } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import MainLogo from '@/assets/logo.png';
import '../../App.css'; 
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Employees",
    url: "/employees",
    icon: ContactRound,
  },
  {
    title: "Departments",
    url: "/departments",
    icon: Building2,
  },
  {
    title: "Attendances",
    url: "/attendances",
    icon: FileClock ,
  },
  {
    title: "Leave / Absence",
    url: "/leave-absences",
    icon: NotebookPen ,
  },
];


const AppSidebar = () => {

  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>(location.pathname);
  
  return (
    <Sidebar>
      <SidebarContent className="sidebar-content">
        <SidebarGroup>
          <SidebarGroupLabel className="sidebar-group-label">
            <img src={MainLogo} alt="Logo" className="main-logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                 <SidebarMenuButton
                    asChild
                    className={item.url === activeItem ? 'sidebar-menu-button-active' : ''}
                    onClick={() => setActiveItem(item.url)}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar
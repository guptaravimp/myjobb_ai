"use client"

import * as React from "react"
import {
 
  IconChartBar,
  IconDashboard,
 
  IconFolder,
 
  IconInnerShadowTop,
  IconListDetails,

} from "@tabler/icons-react"

import { NavMain } from "./nav-main.jsx"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "#",
      icon: IconListDetails,
    },
    {
      title: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Setting",
      url: "#",
      icon: IconFolder,
    },
   
  ],
  
}

export function AppSidebar({
  activeTab, setActiveTab,...props
}) {

  // console.log(activeTab)
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className=" data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-xl  font-semibold">Product Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} setActiveTab={setActiveTab} activeTab={activeTab} />
       
      </SidebarContent>
    
    </Sidebar>
  );
}

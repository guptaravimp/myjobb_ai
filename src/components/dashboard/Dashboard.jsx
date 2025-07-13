"use client"

import { useState } from "react"
import { AppSidebar } from "../app-sidebar.jsx"
// import { ChartAreaInteractive } from "../../components/chart-area-interactive.jsx"
// import { ProductsTable } from "../../components/dataTable.jsx"
import ProductsCom from "../dataTable.jsx"
import { SectionCards } from "../section-cards.jsx"
import { SiteHeader } from "../site-header.jsx"
import {
  SidebarInset,
  SidebarProvider,

} from "../ui/sidebar.jsx"
import Analytics from "../Analytics.jsx"
import Settings from "../Settings.jsx"

// import data from "./data.json"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  console.log("Active tab is ", activeTab)
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <SectionCards />;
      case 'Products':
        return <ProductsCom />;
      case 'Analytics':
        return <Analytics />;
      case 'Setting':
        return <Settings />;
      default:
        return <SectionCards />;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
         
        }
      }>
      <AppSidebar variant="inset"
        activeTab={activeTab}
        setActiveTab={setActiveTab} />
      <SidebarInset className={"p-6"}>
        <SiteHeader  />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4  md:gap-6 md:py-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </SidebarInset>

    </SidebarProvider >
  );
}

"use client";
import { AppSidebar } from "./components/app-sidebar";
import { SideHeader } from "./components/side-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "sonner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SideHeader />
        <div className="flex flex-1 flex-col ">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col ">
              {children}
              <Toaster
                position="top-center"
                richColors
                closeButton 
                expand
                theme="dark"
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

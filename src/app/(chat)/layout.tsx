"use client";
import { AppSidebar } from "./components/app-sidebar";
import { SideHeader } from "./components/side-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";

import FireIcon from "./components/fire-icon";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {isPending } = authClient.useSession();

  if(isPending) return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <FireIcon height={150} width={150}/>
    </div>
  )

  return (
    <>
    <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SideHeader/>
          <div className="flex flex-1 flex-col ">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col ">
                {children}
                <Toaster
                  position="top-center"
                  richColors
                  closeButton 
                  expand
                  theme="light"
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

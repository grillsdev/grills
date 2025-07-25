"use client";
import { AppSidebar } from "./components/app-sidebar";
import { SideHeader } from "./components/side-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";
import AccessRequestNotification from "./components/chat-access-request-notification-toast";

import { WcProvider } from "@/contexts/webcontainer-provider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {isPending } = authClient.useSession();

  if(isPending) return <p className="text-4xl tracking-tight py-[20rem] text-center">Loading....</p>

  return (
    <WcProvider>
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
                <AccessRequestNotification/>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </WcProvider>
  );
}

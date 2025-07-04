"use client";
import { AppSidebar } from "./components/app-sidebar";
import { SideHeader } from "./components/side-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";
import RequestAccessNotification from "./components/request-access-notification";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending } = authClient.useSession();
  

  if(isPending || !session) return <p className="text-4xl tracking-tight py-[20rem] text-center">Loading....</p>

  const user = {
    name: session?.user.name,
    email: session?.user.email,
    avatar: session?.user.image ?? "", // Fallback to empty string if no image
    id:  session?.user.id
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SideHeader user={user} />
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
              <RequestAccessNotification/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import Link from "next/link"

import { NavDocuments } from "./nav-documents"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CirclePlus} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ApiKeysDialogBtn } from "./api-keys-dialog"

import { authClient } from "@/lib/auth-client";
import { NavbarUser } from "./navbar-user"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();

  if(isPending || !session) return null

  const user = {
    name: session?.user.name,
    email: session?.user.email,
    avatar: session?.user.image ?? "", // Fallback to empty string if no image
    id:  session?.user.id
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
       
        <SidebarMenu>
          <SidebarMenuItem className="">
            <Link href={"/"}>
            <SidebarMenuButton
              tooltip="Quick Create"
              className="border bg-black/25 min-w-8 duration-200 ease-linear cursor-pointer z-50 flex justify-between hover:bg-black/40 active:bg-black/40 group"
            >
              <span className="font-lg tracking-wider">Grills</span>
              <CirclePlus className="font-semibold text-foreground"/>
            </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Change to Sidebar document */}
        <NavDocuments/>
      </SidebarContent>
      <SidebarFooter>

        <div className="flex flex-row gap-3 items-center">
         <div className="flex-1">
           <ApiKeysDialogBtn>
        <Button variant="outline" className="w-full flex-1">API Keys</Button>
        </ApiKeysDialogBtn>
         </div>
        <NavbarUser user={user}/>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
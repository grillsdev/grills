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
import { CirclePlus } from "lucide-react"


import { Button } from "@/components/ui/button"
import { ApiKeysDialogBtn } from "./api-keys-dialog"



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
    },
    {
      title: "Lifecycle",
      url: "#",
    },
    {
      title: "Analytics",
      url: "#",
    },
    {
      title: "Projects",
      url: "#",
    },
    {
      title: "Team",
      url: "#",
    },
  ],
  navClouds: [
    {
      title: "Capture",
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
    },
    {
      title: "Get Help",
      url: "#",
    },
    {
      title: "Search",
      url: "#",
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
    },
    {
      name: "Reports",
      url: "#",
    },
    {
      name: "Word Assistant",
      url: "#",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                {/* <IconInnerShadowTop className="!size-5" /> */}
                <span className="text-base font-semibold">Grills</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          <SidebarMenuItem className="">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear cursor-pointer z-50 flex justify-between"
            >
              <span>New Chat</span>
              <CirclePlus className="font-semibold"/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Change to Sidebar document */}
        <NavDocuments items={data.documents} />
      </SidebarContent>
      <SidebarFooter>

        <ApiKeysDialogBtn>
        <Button variant="outline" className="w-full">API Keys</Button>
        </ApiKeysDialogBtn>
      </SidebarFooter>
    </Sidebar>
  )
}
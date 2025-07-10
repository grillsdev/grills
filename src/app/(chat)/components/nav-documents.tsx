import useSWR from "swr"
import Link from "next/link"
import {EllipsisVertical, Forward, Loader2, Trash, Split} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { getUserProjects } from "@/lib/fetchers"
import { usePathname } from "next/navigation"

export function NavDocuments() {
  const {data, isLoading} = useSWR("/api/completion/user", getUserProjects)
  const { isMobile } = useSidebar()

  const currentChatPage = usePathname().split("/")[2]
  console.log(currentChatPage)


  if(isLoading)  return <div className="h-[25rem] flex items-center justify-center"><Loader2 width={"25"} className="text-base-400 animate-[spin_0.4s_linear_infinite]"/></div>

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="tracking-wider">History</SidebarGroupLabel>
      <SidebarMenu>
        {data?.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild  className={`${item.chatId===currentChatPage&&"bg-base-800"}`}>
              <Link href={`/c/${item.chatId}`}>
                {item.type==="joined"&&<Split/>} <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="data-[state=open]:bg-accent rounded-sm"
                >
                  <EllipsisVertical />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-24 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Forward/>
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <Trash />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
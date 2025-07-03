"use client";
import { authClient } from "@/lib/auth-client";
import { CircleUserRound, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"


export function NavbarUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar?: string
  }
}) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/home");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Menubar className="border-0 shadow-none p-0">
      <MenubarMenu>
        <MenubarTrigger asChild className="rounded-full">
          <button
            className="data-[state=open]:bg-transparent data-[state=open]:text-gray-100 flex items-center gap-2"
          >
            <span className="flex items-center rounded-full cursor-pointer text-base-300">
              <CircleUserRound />
            </span>
          </button>
        </MenubarTrigger>
        <MenubarContent
          className="min-w-56 rounded-lg mt-1"
          align="end"
          sideOffset={4}
        >
          <div className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-[14px]">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback className="rounded-[13px]">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />

          {/* <DropdownMenuSeparator /> */}
          <MenubarItem className="flex items-center gap-2" variant="destructive" onClick={handleLogout}>
            <LogOut className="size-4" />
            Log out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
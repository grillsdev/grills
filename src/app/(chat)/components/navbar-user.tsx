import {
    IconCreditCard,
    IconLogout,
    IconNotification,
    IconUserCircle,
  } from "@tabler/icons-react"
  
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
      avatar: string
    }
  }) {
    return (
      <Menubar className="border-0 shadow-none p-0">
        <MenubarMenu>
          <MenubarTrigger asChild className="rounded-full bg-transparent">
            <button
              className="data-[state=open]:bg-transparent data-[state=open]:text-gray-100 flex h-8 w-fit items-center gap-2 text-left"
            >
              <Avatar className="h-7 w-7 rounded-[13px] ">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">HM</AvatarFallback>
              </Avatar>
            </button>
          </MenubarTrigger>
          <MenubarContent
            className="min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <div className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-[14px]">
                  <AvatarImage src={user.avatar} alt={user.name} />
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
            <MenubarItem className="flex items-center gap-2">
              <IconUserCircle className="size-4" />
              Account
            </MenubarItem>
            <MenubarItem className="flex items-center gap-2">
              <IconCreditCard className="size-4" />
              Billing
            </MenubarItem>
            <MenubarItem className="flex items-center gap-2">
              <IconNotification className="size-4" />
              Notifications
            </MenubarItem>
            <DropdownMenuSeparator />
            <MenubarItem className="flex items-center gap-2" variant="destructive">
              <IconLogout className="size-4" />
              Log out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }
import { SidebarTrigger } from "@/components/ui/sidebar";

import { StartProjectDialogBtn } from "./start-project";
import { Invitation } from "./invitation";
import { NavbarUser } from "./navbar-user";

export function SideHeader({
  user,
}: {
  user: { id: string, name: string; email: string; avatar?: string };
}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-1 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <div className="ml-auto flex items-center gap-3">
          <div className="flex flex-row items-center gap-3 ">
            <StartProjectDialogBtn />
            <Invitation />
          </div>
          <NavbarUser user={user} />
        </div>
      </div>
    </header>
  );
}

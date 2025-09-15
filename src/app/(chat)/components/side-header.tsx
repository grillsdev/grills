import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function SideHeader() {
  const {setOpen, state} = useSidebar()

  const handleSidebarState = () => {
    const isOpen = state === "expanded"
    setOpen(!isOpen)
  }
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 py-1 lg:gap-2 lg:px-6">
        <div className="flex flex-row items-center gap-2">
        <SidebarTrigger className="-ml-1" onClick={handleSidebarState} />
        {state==="collapsed"&&(
        <Link href="/"><Plus/></Link>
        )}
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex flex-row items-center gap-1 ">
            <Button size={"sm"} variant={"link"} className="text-primary text-xs">
              <a href="https://grills.featurebase.app" target="_blank">Feedback</a>
            </Button>

          </div>
        </div>
      </div>
    </header>
  );
}

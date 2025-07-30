import { usePathname } from "next/navigation";
import useSWR from "swr";
import { amIAdmin } from "@/lib/fetchers";

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";

import CopyToClipboard from "./copy-to-clipboard";

export const Invitation = () => {
  const pathname = usePathname();
  const paths = pathname.split("/")
  const isChatPage = paths[1] === "c" && paths[2];
  const {isLoading, error} = useSWR(pathname!=="/"?`/api/project/${paths[2]}`:null, amIAdmin, {
    shouldRetryOnError:false
  })

  if (!isChatPage || isLoading || error) return null;
  return (
    <div>
      {/* <Button variant={"outline"} size={"sm"} className="cursor-pointer">
        <Handshake  />
      </Button> */}
      <Menubar className="border-0 shadow-none p-0">
            <MenubarMenu>
              <MenubarTrigger asChild className="rounded-full">
                <Button
                variant={"outline"}
                size={"sm"}
                  className=""
                >
                <Handshake/>
                </Button>
              </MenubarTrigger>
              <MenubarContent
                className="min-w-56 rounded-lg mt-1 bg-accent"
                align="end"
                sideOffset={4}
              >
                <div className="p-0 font-normal ">
                    <div className="flex xtext-sm  items-center px-1 py-1.5">
                      <span className="text-muted-foreground truncate text-xs flex flex-row items-center justify-between w-full">
                        {"https//grills.dev/in/act_5c32a8d3-61a2-4338-905c-0ef9495525c3/act_5c32a8d3-61a2-4338-905c-0ef9495525c3".slice(0, 33)} <CopyToClipboard text={location.href}  />
                      </span>
                    </div>
                </div>
      
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
    </div>
  );
};

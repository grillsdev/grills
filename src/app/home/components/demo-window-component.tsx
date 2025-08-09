import * as React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FilePenLine, FileCode2, Puzzle } from "lucide-react";
import GeneratedComponentCode from "./generated-setting-component-svg";
import { Button } from "@/components/ui/button";

import Prompt from "./prompt";

export type WorkspaceTabsProps = {
  defaultTab?: "prompt" | "app" | "component";
};


// 1. Main component with named export
export function GeneratedComponent({
  defaultTab = "prompt",
}: WorkspaceTabsProps) {
  const defaultValue = React.useMemo(() => {
    switch (defaultTab) {
      case "prompt":
        return "prompt";
      case "app":
        return "app";
      case "component":
        return "component";
      default:
        return "prompt";
    }
  }, [defaultTab]);

  const BTN_PRIMARY = "#87ceeb";
  const BTN_SECONDARY = "oklch(54.6% 0.245 262.881)";

  return (
    <section
      className="relative w-full max-w-5xl mx-auto bg-background"
      aria-label="Tabs Parent Container"
    >
      <div className="w-full rounded-lg border border-input">
        <div className="flex items-center gap-2 px-5 pb-3 pt-4">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <Tabs
          defaultValue={defaultValue}
          className="flex h-full w-full flex-col"
        >
          {/* Sticky header area for tab triggers */}
          <div className="shrink-0 px-3 pt-3 sm:px-2 sm:pt-2">
            <TabsList className="w-full max-w-xs justify-start overflow-x-auto bg-transparent">
              <TabsTrigger
                value="prompt"
                aria-label="Prompt tab"
                className="gap-2"
              >
                <FilePenLine className="h-4 w-4" aria-hidden="true" />
                <span>Prompt</span>
              </TabsTrigger>
              <TabsTrigger
                value="app"
                aria-label="app.tsx tab"
                className="gap-2"
              >
                <FileCode2 className="h-4 w-4" aria-hidden="true" />
                <span>App.tsx</span>
              </TabsTrigger>
              <TabsTrigger
                value="component"
                aria-label="Component tab"
                className="gap-2"
              >
                <Puzzle className="h-4 w-4" aria-hidden="true" />
                <span>Component</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Scrollable content region fills remaining height */}
          <div
            className="min-h-0 grow px-3 pb-3 sm:px-4 sm:pb-4  h-[25rem]"
            role="region"
            aria-label="Tabs content region"
          >
            <TabsContent value="prompt" className="m-0 h-full" asChild>
              <ScrollArea className="h-full w-full pt-1 px-2 md:px-0">
                  <Prompt/>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="app" className="m-0" asChild>
              <ScrollArea className="h-full w-full">
                <div className="-mt-4 md:-mt-16 -ml-6 md:-ml-[12rem]">
                  <GeneratedComponentCode />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="component" className="m-0 h-full" asChild>
              <div className="h-full w-full flex flex-col items-center justify-center">
                <Link href="/generated" className="-mt-16">
                <Button
                  variant={"outline"}
                  className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px]"
                >
                  <span
                    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
                    style={{
                      background: `conic-gradient(from 90deg at 50% 50%, ${BTN_PRIMARY} 0%, ${BTN_SECONDARY} 50%, ${BTN_PRIMARY} 100%)`,
                    }}
                  />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
                    View component
                  </span>
                </Button>
                </Link>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

// 3. Default export from wrapper
export default GeneratedComponent;

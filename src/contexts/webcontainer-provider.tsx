'use client'
import { createContext, useContext, useState, useEffect, useRef} from "react";
import {  WebContainer } from "@webcontainer/api";
import { viteReactShadcnTemplate } from "@/lib/wc-react-vite-template";

type WcInstanceStatus = "booting" | "file" | "installing" | "server" | "passed" | "failed"

interface WcProviderState {
    wcInstance: React.RefObject<WebContainer | null>
    wcInstanceStatus: WcInstanceStatus
    wcURL: string | null
}

interface WcProviderProps{
    children: React.ReactNode
}


const WcProviderContext = createContext<WcProviderState | undefined>(undefined)

export function WcProvider({
    children,
    ...props
}: WcProviderProps){
    const [wcURL, setWcURL] = useState<string | null>(null);
    const [wcInstanceStatus, setWcInstanceStatus] = useState<WcInstanceStatus>("booting")
    const wcInstance = useRef<WebContainer | null>(null);

    useEffect(() => {
    if (wcInstance.current) return;
    initializeWebContainer();
    }, []);

    console.log(wcInstanceStatus)

    async function initializeWebContainer() {
          if (wcInstance.current) return;
          try {
            wcInstance.current = await WebContainer.boot();
    
            setWcInstanceStatus("file")
            await wcInstance.current.mount(viteReactShadcnTemplate);

            setWcInstanceStatus("installing")
            const installDep = await wcInstance.current.spawn("npm", ["install"]);
    
            // Wait for installation to complete
            const installExitCode = await installDep.exit;
    
            if (installExitCode !== 0) {
              setWcInstanceStatus("failed")
              throw new Error("Failed to install dependencies")
            }
    
            setWcInstanceStatus("server")
            await wcInstance.current.spawn("npm", ["run", "dev"]);
    
            wcInstance.current.on("server-ready", (port, url) => {
              console.log("URL", url, port);
              setWcURL(url);
              setWcInstanceStatus("passed")
            });
          } catch (error:unknown) {
            if (error instanceof Error) {
            console.log(error.message)
             }
          }
    }

    const value = {
        wcInstance,
        wcInstanceStatus,
        wcURL,
    }

  return (
    <WcProviderContext.Provider {...props} value={value}>
        {children}
    </WcProviderContext.Provider>
  )
}

export const useWebcontainer = () => {
    const context  = useContext(WcProviderContext)

    if (context === undefined){
        throw new Error("useWc must be used within a WcProvider")
    }

    return context
}
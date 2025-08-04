"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { WebContainer, FileSystemTree } from "@webcontainer/api";
import { viteReactShadcnTemplate } from "@/lib/wc-react-vite-template";
import { getPackageLockFile, savePackageLockFile } from "@/lib/utils";

type WcInstanceStatus =
  | "booting"
  | "file"
  | "installing"
  | "passed"
  | "failed";

interface WcProviderState {
  wcInstance: React.RefObject<WebContainer | null>;
  wcInstanceStatus: WcInstanceStatus;
  wcURL:string | undefined,
  terminalOutput:string,
  updateTerminalOutput: (text:string)=> void
}

interface WcProviderProps {
  children: React.ReactNode;
}

const WcProviderContext = createContext<WcProviderState | undefined>(undefined);

export function WcProvider({ children, ...props }: WcProviderProps) {
  const [wcInstanceStatus, setWcInstanceStatus] =
    useState<WcInstanceStatus>("booting");
  const wcInstance = useRef<WebContainer | null>(null);
  const [wcURL, setWcURL] = useState<string|undefined>(undefined)
  const [terminalOutput, setTerminalOutput] = useState("")
  const lockFile = getPackageLockFile()

  useEffect(() => {
    if (wcInstance.current) return;
    initializeWebContainer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTerminalOutput = (text:string) => {
    setTerminalOutput(text)
  }

  async function initializeWebContainer() {
    if (wcInstance.current) return;
    try {
      wcInstance.current = await WebContainer.boot();

      setWcInstanceStatus("file");
      await wcInstance.current.mount(viteReactShadcnTemplate);
      if(lockFile){
      const lockFileJSON: FileSystemTree = {
            'package-lock.json': {
              file: {
                contents: lockFile
              }
            },
        };
      await wcInstance.current.mount(lockFileJSON);
      }

      setWcInstanceStatus("installing");
      const installDep = await wcInstance.current.spawn("npm", [
        "install",
        "--no-optional",
        "--no-audit",
      ]);
      installDep.output.pipeTo(
        new WritableStream({
          write(data) {
            setTerminalOutput(`${data}  📦  downloading pkgs  📦  `)
          },
        })
      );
      const installExitCode = await installDep.exit;
      if (installExitCode !== 0) {
        setWcInstanceStatus("failed");
        setTerminalOutput("Failed to start the project, please refresh this page")
        throw new Error("Failed to install dependencies");
      }
      const configProcess = await wcInstance.current.spawn("npm", [
        "config",
        "set",
        "yes",
        "true",
      ]);
      await configProcess.exit;
      const installShadcn = await wcInstance.current.spawn("npx", [
        "shadcn@latest",
        "init",
      ]);
      installShadcn.output.pipeTo(
        new WritableStream({
          write(data) {
            setTerminalOutput(`${data} ⚙️ Setting up ShadCn  ⚙️ `)
          },
        })
      );
      await installShadcn.exit
      if(!lockFile){
          const pkgFile =  await wcInstance.current.fs.readFile('/package-lock.json')
          const decoder = new TextDecoder("utf-8");
          const readableString = decoder.decode(pkgFile);
          savePackageLockFile(readableString)
      }
      setWcInstanceStatus("passed");
      await wcInstance.current.spawn("npm", ["run", "dev"]);
      wcInstance.current.on("server-ready", (port, url) => {
        setWcURL(url)
        setTerminalOutput("✅ Ready state ✅")
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  const value = {
    wcInstance,
    wcInstanceStatus,
    wcURL,
    terminalOutput,
    updateTerminalOutput
  };

  return (
    <WcProviderContext.Provider {...props} value={value}>
      {children}
    </WcProviderContext.Provider>
  );
}

export const useWebcontainer = () => {
  const context = useContext(WcProviderContext);

  if (context === undefined) {
    throw new Error("useWc must be used within a WcProvider");
  }

  return context;
};

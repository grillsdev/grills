import { useEffect, useState } from "react";
import { FileSystemTree } from "@webcontainer/api";
import { useWebcontainer } from "@/contexts/webcontainer-provider";

import { getLocalSavedTheme } from "@/lib/utils";
import * as shadcnComponents from "@/lib/shadcn-components";

import { Loader2 } from "lucide-react";
import { $sanboxObj } from "@/store/sandbox";

const getIndexCss = () => {
  const isLocalTheme = getLocalSavedTheme();
  if (isLocalTheme) {
    return `
    @import "tailwindcss";
    @import "tw-animate-css";

    @custom-variant dark (&:is(.dark *));

    ${isLocalTheme.data}

     @layer base {
      * {
        @apply border-border outline-ring/50;
      }
      body {
        @apply bg-background text-foreground;
      }
    }
    `;
  }
  return shadcnComponents.indexCSS;
};

const CodeRenderer = () => {
  const { wcInstance, wcInstanceStatus } = useWebcontainer();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);
  //always get the last code/selected
  const sb = $sanboxObj.get();
  const code = sb.code;
  const pkg = sb.pkg || [];
  const isStreaming = sb.isStreaming

  useEffect(() => {
    if (!wcInstance.current) return;
    if (wcInstanceStatus !== "passed") return;
    if(!isStreaming){
    startWebcontainer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wcInstance, wcInstanceStatus, code, isStreaming]);

  const startWebcontainer = async () => {
    if (!wcInstance.current) return;
    setIsLoading(true);
    //add the component file
    const componentTSX: FileSystemTree = {
      src: {
        directory: {
          "Component.tsx": {
            file: {
              contents: code,
            },
          },
          "index.css": {
            file: {
              contents: getIndexCss(),
            },
          },
        },
      },
    };
    await wcInstance.current.mount(componentTSX);
    // const pkgFile =  await wcInstance.current?.fs.readFile('/package.json')
    // const decoder = new TextDecoder("utf-8");
    // const readableString = decoder.decode(pkgFile);
    // console.log(readableString);

    // //No pkgs just return
    // if (pkg.length < 1) {
    //   console.log("❌ No pkgs ❌");
    //   setIsLoading(false);
    //   return;
    // }

    // still setting isLoading(false) while dowlodong the pakages

    // get saved component bcs no need to downlode again once again;
    const existsFile: string[] = await wcInstance.current.fs.readdir(
      "/src/components/ui"
    );
    console.log("✅ ui files exists ✅", existsFile);
    const filenames = existsFile.map((file) => file.replace(".tsx", ""));
    console.log("~~FileName~~", filenames);
    const remainingPkgs: string[] = pkg.filter(
      (item) => !filenames.includes(item)
    );
    console.log("~~Remaining pkgs ~~~~", remainingPkgs);

    if (remainingPkgs.length > 0) {
      const configProcess = await wcInstance.current.spawn("npm", ["config", "set", "yes", "true"]);
      await configProcess.exit;
      const installArgs = ["shadcn@latest", "add", ...(remainingPkgs || [])];
      const installDep = await wcInstance.current.spawn("npx", installArgs);

      console.log("⬇️ yet to downlode dowloding pkgs ⬇️", installArgs);

      installDep.output.pipeTo(
        new WritableStream({
          write(data) {
            console.log(data);
            console.log("⬇️ 📦 downloading pkgs 📦 ⬇️");
          },
        })
      );
      // Wait for installation to complete
      await installDep.exit;

      const dir = await wcInstance.current.fs.readdir("/src/components/ui");
      console.log("✅ ui files added ✅", dir);
    }

    // console.log("~~Side bar~~~")
    // const pkgFile =  await wcInstance.current?.fs.readFile('/src/components/ui/sidebar.tsx')
    // const decoder = new TextDecoder("utf-8");
    // const readableString = decoder.decode(pkgFile);
    // console.log(readableString);

    await wcInstance.current.spawn("npm", ["run", "dev"]);
    wcInstance.current.on("server-ready", (port, url) => {
      setPreviewUrl(url);
      setIsLoading(false);
    });
  };

  if (wcInstanceStatus !== "passed" || isLoading) {
    return (
      <div className="flex items-center justify-center h-[27.5rem] w-full text-green-500 animate-in">
        <div className="flex flex-col items-center justify-between gap-3">
          <Loader2 width={29} className="animate-[spin_0.4s_linear_infinite]" />
          {wcInstanceStatus !== "passed" && (
            <span className="text-xs bottom-0 relative animate-pulse font-medium">
              Installing dependencies sometimes takes time.
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <iframe
        key={previewUrl}
        width="100%"
        height="100%"
        src={previewUrl}
        sandbox="allow-scripts allow-modals allow-same-origin allow-forms allow-popups"
        className="bg-accent flex-1 min-h-0 border-0"
        style={{
          overflow: "auto",
          WebkitOverflowScrolling: "touch", // Better scrolling on mobile
        }}
        onLoad={() => {
          console.log("Iframe loaded:", previewUrl);
        }}
        onError={(e) => {
          console.error("Iframe load error:", e);
        }}
      />
    </div>
  );
};

export default CodeRenderer;

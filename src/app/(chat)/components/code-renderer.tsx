import { useEffect, useState } from "react";
import { FileSystemTree } from "@webcontainer/api";
import { useWebcontainer } from "@/contexts/webcontainer-provider";

import { getLocalSavedTheme } from "@/lib/utils";
import * as shadcnComponents from "@/lib/shadcn-components";

import dedent from "dedent";
import { Loader2 } from "lucide-react";

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

const CodeRenderer = ({ code, pkg }: { code: string; pkg: string[] }) => {
  const { wcInstance, wcURL } = useWebcontainer();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false);

  useEffect(() => {
    startWebcontainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, pkg]);

  const startWebcontainer = async () => {
    setIsLoading(true);
    /**
     * If pakages is available only then run the npm add
     */
    // if(pkg.length>0){
    // const installArgs = ["add", ...pkg];
    // const installDep = await wcInstance.current?.spawn("npm", installArgs);
    //   console.log(installArgs, "~~~~DEPS")

    // installDep?.output.pipeTo(new WritableStream({
    // write(data) {
    //   console.log(data);
    // },
    // }))
    // // Wait for installation to complete
    // const installExitCode = await installDep?.exit;

    // if (installExitCode !== 0) {
    //   setError(true);
    //   setIsLoading(false);
    // }
    // }

    //add the component file
    const componentTSX: FileSystemTree = {
      src: {
        directory: {
          "Component.tsx": {
            file: {
              contents: dedent`${code}`,
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
    await wcInstance.current?.mount(componentTSX);
    // const pkgFile =  await wcInstance.current?.fs.readFile('/package.json')
    // const decoder = new TextDecoder("utf-8");
    // const readableString = decoder.decode(pkgFile);
    // console.log(readableString);
    // const compFile = await wcInstance.current?.fs.readFile(
    //   "/src/components/ui/separator.tsx"
    // );
    // const decoder2 = new TextDecoder("utf-8");
    // const readableString2 = decoder2.decode(compFile);
    // console.log(readableString2);
    setIsLoading(false);
  };

  if (!wcURL || isLoading) {
    return (
      <div className="flex items-center justify-center h-[27.5rem] w-full text-green-500 animate-in">
        <div className="flex flex-col items-center justify-between gap-3">
          <Loader2 width={29} className="animate-[spin_0.4s_linear_infinite]"/>
        <span className="text-xs bottom-0 relative animate-pulse font-medium">Installing dependencies sometimes takes time.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">       
  <iframe       
    key={wcURL}       
    width="100%"       
    height="100%"       
    src={wcURL}       
    sandbox="allow-scripts allow-modals allow-same-origin allow-forms"       
    className="bg-accent flex-1 min-h-0 border-0"
    style={{ 
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch' // Better scrolling on mobile
    }}
    onLoad={() => {         
      console.log("Iframe loaded:", wcURL);       
    }}       
    onError={(e) => {         
      console.error("Iframe load error:", e);       
    }}     
  />     
</div>
  );
};

export default CodeRenderer;

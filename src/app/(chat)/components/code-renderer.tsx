import { useEffect, useState } from "react";
import { FileSystemTree } from "@webcontainer/api";
import { useWebcontainer } from "@/contexts/webcontainer-provider";

import ProgressBar from './sandbox-progress-bar';

import dedent from "dedent";

const CodeRenderer = ({ code, pkg }: { code: string; pkg: string[] }) => {
  const { wcInstance, wcURL } = useWebcontainer();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState(false)

  useEffect(()=>{
    startWebcontainer()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[code, pkg])

  const startWebcontainer = async () => {
    setIsLoading(true)
    const installArgs = ["install", ...pkg];
    const installDep = await wcInstance.current?.spawn("npm", installArgs);

    // installDep?.output.pipeTo(new WritableStream({
    // write(data) {
    //   console.log(data);
    // },
    // }))
    // Wait for installation to complete
    const installExitCode = await installDep?.exit;

    if (installExitCode !== 0) {
      setError(true)
      setIsLoading(false)
    }

    //add the component file
    const componentTSX: FileSystemTree = {
      src: {
        directory: {
          "Component.tsx": {
            file: {
              contents: dedent`${code}`,
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
    //   const compFile =  await wcInstance.current?.fs.readFile('/src/components/ui/dialog.tsx')
    // const decoder2 = new TextDecoder("utf-8");
    // const readableString2 = decoder2.decode(compFile);
    // console.log(readableString2)
    setIsLoading(false)

  };


  if(!wcURL || isLoading) {
    return (
      <div className="flex items-center justify-center h-[27.5rem] w-full text-green-500 animate-in">
        <ProgressBar/>
      </div>
    )
  }

  return (
  <>
      <iframe
      key={wcURL}
        width="100%"
        height="100%"
        src={wcURL}
        sandbox="allow-scripts allow-modals allow-same-origin allow-forms"
        className="bg-accent"
        onLoad={() => {
          // Optional: Add logs here
          console.log("Iframe loaded:", wcURL);
        }}
        onError={(e) => {
        console.error('Iframe load error:', e);
  }}
      />
  </>
);
};

export default CodeRenderer;

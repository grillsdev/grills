import { useEffect, useRef } from "react";
import useSWRMutation from "swr/mutation";
import { useStore } from "@nanostores/react";

import { Loader2 } from "lucide-react";
import { executeSandboxCode } from "@/lib/fetchers";
import { $sanboxObj } from "@/store/sandbox";
import { toast } from "sonner";
import { indexCSS } from "@/lib/shadcn-components";
import { getSandboxURL } from "@/lib/utils";


const CodeRenderer = () => {
  const iframeSrc = useRef<string |undefined>(undefined)

  //always get the last code/selected
  const sb = useStore($sanboxObj)
  const code = sb.code!;
  if(!code) toast.warning("No code for exicution, may throw an error.")
  const isStreaming = sb.isStreaming;

  const {
    trigger: triggerExecuteSandbox,
    isMutating: isExecuting,
    error,
  } = useSWRMutation(
    getSandboxURL(),
    executeSandboxCode,
    {
      onSuccess(data) {
        iframeSrc.current = data.previewUrl!;
      }
    }
  );

  useEffect(()=>{
    if(isStreaming) return;
    const e2b =
    typeof window !== "undefined" ? localStorage.getItem("grills:e2b") : null;
    if(!e2b) return;
    triggerExecuteSandbox({
        msgId: sb.id,
        code: code,
        sandboxAPI: e2b,
        css: indexCSS
    })
    .then(()=>{
      // console.log(data)
    })
    .catch((error)=>{
      return toast.warning(error.message)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sb.id, isStreaming])


  if (isExecuting && !iframeSrc.current) {
    return (
      <div className="flex items-center justify-center h-[27.5rem] w-full text-green-400">
        <div className="flex flex-col items-center justify-between gap-3">
          <Loader2 width={29} className="animate-[spin_0.4s_linear_infinite]" />
          <span className="text-xs bottom-0 relative animate-pulse font-medium">
            Starting sandbox...
          </span>
        </div>
      </div>
    );
  }

  if (error)
    return (
      <div className="flex items-center justify-center h-[27.5rem] w-full ">
        <p className="text-red-500 font-medium text-sm max-w-md">{error.message}</p>
      </div>
    );

  return (
    <div className="h-full">
        <iframe
          key={sb.id}
          width="100%"
          height="100%"
          src={iframeSrc.current}
          sandbox="allow-scripts allow-modals allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
          className="bg-accent flex-1 min-h-0 border-0"
          style={{
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
          }}
          onLoad={() => {
            console.log("Iframe loaded successfully");
          }}
          onError={(e) => {
            console.error("Iframe load error:", e);
            alert("Failed to load preview");
          }}
        />
    </div>
  );
};

export default CodeRenderer;

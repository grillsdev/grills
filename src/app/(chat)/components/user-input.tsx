import {
  useState,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { Loader2, Send } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { toast } from "sonner";

import { ModelSelectBtn } from "./model-select-dialog";
import { getApiKey } from "@/lib/utils";

import { ModelSelect } from "./model-select-dialog";
import { APIKeysDialog } from "./api-keys-dialog";
// import UserTheme from "./theme";
import { useStore } from "@nanostores/react";
import { $modelObj } from "@/store/store";

import { v4 as uuid } from "uuid";


const UserInput = ({
  handleChatSubmit,
  handleChatInputChange,
  chatInput,
  disable,
}: {
  handleChatSubmit?: () => void;
  handleChatInputChange?: (
    e: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
  ) => void;
  chatInput?: string;
  disable?: boolean;
}) => {
  const [homePageInput, setHomePageInput] = useState<string>("");
  const [modelDShouldOpen, setModelDShouldOpen] = useState<boolean>(false)
  const [apiDShouldOpen, setApiDShouldOpen] = useState<boolean>(false)
  const [e2bDShouldOpen, setE2bDShouldOpen] = useState(false)

  const currentModel = useStore($modelObj)

  const pathname = usePathname();
  const route = useRouter()

  useEffect(() => {
    const isMsgStored = localStorage.getItem("llm-query-state");
    if (isMsgStored) {
      const msg = JSON.parse(isMsgStored) as { message: string };
      if (msg.message.trim() === "") return;
      setHomePageInput(msg.message)
    }
  }, []);

  const isHomePage = pathname === "/";

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    console.log("runing handle user input")

    if(disable) return

    const isModelSelected = currentModel.model
    if(!isModelSelected?.model){
      toast.warning("Please Select your model.",{
        position:"top-center"
      })
      setModelDShouldOpen(true)
      return;
    }

    //Api key added of there model Provider
    const isAPIKey = getApiKey(isModelSelected.llm)
    if(!isAPIKey){
      toast.warning(`Please add your ${isModelSelected.llm} API key`,{
        position:"top-center"
      })
      setApiDShouldOpen(true)
      return;
    }

    // if E2b API is not present popup with the ?e2b
    const isE2b = localStorage.getItem("grills:e2b");
    if(!isE2b){
      toast.warning(`Please add your E2B API key`,{
        position:"top-center"
      })
      setE2bDShouldOpen(true)
      return;
    }


    if (isHomePage) {
      // save the current user query in local storage and redirect to the chat page with newly created id
     localStorage.setItem('llm-query-state', JSON.stringify({message:homePageInput}));
     const newChatId = `cht-${uuid()}`
     route.push(`/c/${newChatId}`)
    }
    //if not home page submit the chat 
    handleChatSubmit?.();
  };

  const handleKeyDown = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSubmit();
    }
  };

  const handleHomePageInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setHomePageInput(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          handleSubmit(e).catch(() => console.log("FormEvent Error"));
        }}
        className="relative flex flex-col items-center"
      >
        <Textarea
          className={`w-full pt-3 pb-20 resize-none rounded-4xl border placeholder:text-base-400 placeholder:text-xs placeholder:px-1 max-h-72 no-scrollbar ${
            !isHomePage && "backdrop-blur-3xl"
          }  ${disable && "!cursor-not-allowed"}`}
          placeholder="Build me a dashboard for student attendance management...."
          required={true}
          onChange={
            isHomePage ? handleHomePageInputChange : handleChatInputChange
          }
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            handleKeyDown(e).catch(() => console.log("error while submitting"));
          }}
          value={isHomePage ? homePageInput : chatInput}
          disabled={disable}
          name="userInput"
        />
        <div className="relative flex  w-full">
          <div 
          onClick={(e) => e.stopPropagation()}
          className="flex flex-row items-center absolute left-3 bottom-1.5"
          >
            <ModelSelectBtn/>
            {/* <UserTheme/> */}
          </div>
          <button
            type="submit"
            disabled={disable}
            className="absolute right-3 bottom-3 bg-accent-foreground text-accent p-1.5 rounded-full cursor-pointer disabled:bg-muted disabled:text-foreground"
          >
            {disable?(<Loader2 width={18.5} height={18.5} className="animate-spin"/>):(<Send width={18.5} height={18.5} />)}
          </button>
        </div>
      </form>
      <ModelSelect openWindow={modelDShouldOpen} handleOpenWindow={()=>setModelDShouldOpen(false)}/>
      <APIKeysDialog openWindow={apiDShouldOpen} windowState={setApiDShouldOpen}/>
      <APIKeysDialog openWindow={e2bDShouldOpen} windowState={setE2bDShouldOpen} defaultTab="sandbox"/>
    </>
  );
};

export { UserInput }

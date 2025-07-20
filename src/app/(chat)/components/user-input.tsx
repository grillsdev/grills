import {
  useState,
  type KeyboardEvent,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import { Send } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid } from "uuid";

import { toast } from "sonner";

import { ModelSelectBtn } from "./model-select-dialog";
import { getSelectedModel, getApiKey } from "@/lib/utils";

import { ModelSelect } from "./model-select-dialog";
import { APIKeysDialog } from "./api-keys-dialog";


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

  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === "/";

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if(disable) return

    const isModelSelected = getSelectedModel()
    if(!isModelSelected){
      toast.warning("Please Select your model.",{
        position:"top-center"
      })
      setModelDShouldOpen(true)
      return;
    }

    const isApiKey = getApiKey(isModelSelected.llm)
    if(!isApiKey){
      toast.warning(`Please add your ${isModelSelected.llm.toUpperCase()} API key`,{
        position:"top-center"
      })
      setApiDShouldOpen(true)
      return;
    }


    if (isHomePage) {
      const setId = (uuid as () => string)();
     localStorage.setItem('llm-query-state', JSON.stringify({id:setId, message:homePageInput}));
      router.push(`/c/${setId}?q=new`);
    }
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
          className={`w-full pt-3 pb-20 resize-none rounded-4xl border placeholder:text-base-400 placeholder:text-xs max-h-72 no-scrollbar ${
            !isHomePage && "backdrop-blur-3xl"
          }  ${disable && "!cursor-not-allowed"}`}
          placeholder="What is meaning is meaning of life...."
          required={true}
          onChange={
            isHomePage ? handleHomePageInputChange : handleChatInputChange
          }
          onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => {
            handleKeyDown(e).catch(() => console.log("error while submitting"));
          }}
          value={isHomePage ? homePageInput : chatInput}
          name="userInput"
        />
        <div className="relative flex flex-row items-center justify-center w-full">
          <div className="absolute left-3 bottom-3">
            <ModelSelectBtn/>
          </div>
          <button
            type="submit"
            className="absolute right-3 bottom-3 bg-accent-foreground text-accent p-1.5 rounded-full cursor-pointer"
          >
            <Send width={18.5} height={18.5} />
          </button>
        </div>
      </form>
      <ModelSelect openWindow={modelDShouldOpen} handleOpenWindow={()=>setModelDShouldOpen(false)}/>
      <APIKeysDialog openWindow={apiDShouldOpen} windowState={setApiDShouldOpen}/>
    </>
  );
};

export { UserInput }

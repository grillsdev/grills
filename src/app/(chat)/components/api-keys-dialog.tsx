import { useEffect, useState, type ReactNode } from "react";
import { useCompletion } from "@ai-sdk/react";
import useSWR from "swr";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader as Loader } from "lucide-react";

import { getModels } from "@/lib/fetchers";
import type { AvailableModels } from "@/lib/types";

import { saveKeys, getApiKey } from "@/lib/utils";

import { LLMProviderIcons } from "@/lib/utils";

import Image from 'next/image'


// input API KEY, llm is llm model
//llmname is the unique udentifier of the llm
const ApiInput = ({ llmTitle, llmName}: { llmTitle:string, llmName: string }) => {
  const [isVerified, setIsVerified] = useState(false);
  const { input, handleInputChange, handleSubmit, isLoading, error, setInput } =
    useCompletion({
      streamProtocol: "text",
      api: `/api/completion/models`,
      // credentials: "include",
      body: {
        llm: llmName,
      },
      onFinish: () => {
        saveKeys(llmName, input)
        setIsVerified(true);
      },
    });

  useEffect(()=>{
    const isLLMKeyStored = getApiKey(llmName)
    if(isLLMKeyStored){
      setInput(isLLMKeyStored)
    }
  }, [llmName, setInput])

  return (
    <div>
      <div className="flex items-center py-2">
        <div className="h-7 w-7 flex items-center justify-center mr-3">
          <Image src={LLMProviderIcons[llmName]} alt={LLMProviderIcons[llmName] + "-" + "logo"} width={35} height={35} className="rounded-[16px]" />
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm">{llmTitle}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Input
          onChange={handleInputChange}
          value={input}
          disabled={isLoading}
          autoComplete="off"
          minLength={10}
          required
          className={error && "border-destructive"}
        />
        <Button type="submit" disabled={isLoading || !input} className="">
          {isLoading && <Loader className="animate-spin" />}{" "}
          {isVerified ? "Saved!" : "Save"}
        </Button>
      </form>
    </div>
  );
};

export const APIKeysDialog = ({
  openWindow,
  windowState,
}: {
  openWindow: boolean;
  windowState: (state: boolean) => void;
}) => {
  const { data: llms} = useSWR<AvailableModels[]>("/api/completion/models", getModels)

  if(!llms) return null;

  return (
    <Dialog open={openWindow} onOpenChange={windowState}>
      <DialogContent className="sm:max-w-md" tabIndex={-1}>

       
        <DialogHeader>
          <DialogTitle className="text-left">
            Enter Your API Keys
          </DialogTitle>
          <DialogDescription className="text-left">
            API keys will be saved in your browser. <span className="text-xs text-primary">OpenAI, Gemini, Open Router, TogetherAI and Groq</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-3 max-h-[23.5rem] overflow-y-auto no-scrollbar">
          {llms.map((model) => (
            <ApiInput llmTitle={model.title} llmName={model.name} key={model.id} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ApiKeysDialogBtn = ({ children }: { children: ReactNode }) => {
  const [openDialogWondow, setOpenDialogWindow] = useState(false);

  const handleDialogWindowState = (state: boolean) => {
    setOpenDialogWindow(state);
  };

  return (
    <>
      <div role="button" onClick={() => handleDialogWindowState(true)}>
        {children}
      </div>
      <APIKeysDialog
        openWindow={openDialogWondow}
        windowState={handleDialogWindowState}
      />
    </>
  );
};

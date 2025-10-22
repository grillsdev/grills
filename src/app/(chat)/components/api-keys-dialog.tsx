import { useEffect, useState, type ReactNode } from "react";
import { useCompletion } from "@ai-sdk/react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader as Loader } from "lucide-react";

import { models } from "@/lib/models";
import { saveKeys, getApiKey } from "@/lib/utils";

import { LLMProviderIcons } from "@/lib/utils";

import Image from 'next/image'


const Context7 = () => {
  const [context7Value, setContext7Value] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Load saved value on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem("grills:context7");
    if (savedValue) {
      setContext7Value(savedValue);
    }
  }, []);

  // Save on button click with confirmation
  const handleSave = () => {
    try {
      localStorage.setItem("grills:context7", context7Value);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    } catch (err) {
      console.error("Failed to save key", err);
    }
  };

  return (
    <div className="px-1">
      <div className="flex items-center py-2">
        <div className="h-7 w-7 flex items-center justify-center mr-3">
          <Image 
            src="/context7.ico" 
            alt="Context7 logo" 
            width={40} 
            height={40} 
            className="rounded-[16px]" 
          />
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm">Context7</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Input
          onChange={(e) => setContext7Value(e.target.value)}
          value={context7Value}
          autoComplete="off"
          placeholder="Enter your Context7 API key."
        />
        <Button type="button" onClick={handleSave}>
          {isSaved ? "Saved!" : "Save"}
        </Button>
      </div>

      <div className="py-12 flex">
        {/* Yellow vertical line */}
        <div className="w-1 bg-green-400 mr-6 flex-shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">IMPORTANT</h2>
          <p className="text-sm md:text-base mb-1.5 font-medium">Make sure the API key is correct and working.</p>
        </div>
      </div>
    </div>
  );
};

const Sandbox = () => {
  const [e2bValue, setE2bValue] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Load saved value on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem("grills:e2b");
    if (savedValue) {
      setE2bValue(savedValue);
    }
  }, []);

  // Save on button click with confirmation
  const handleSave = () => {
    try {
      localStorage.setItem("grills:e2b", e2bValue);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 1500);
    } catch (err) {
      console.error("Failed to save key", err);
    }
  };

  return (
    <div className="px-1">
      <div className="flex items-center py-2">
        <div className="h-7 w-7 flex items-center justify-center mr-3">
          <Image 
            src="/e2b.png" 
            alt="E2B logo" 
            width={40} 
            height={40} 
            className="rounded-[16px]" 
          />
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm">E2B</span>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Input
          onChange={(e) => setE2bValue(e.target.value)}
          value={e2bValue}
          autoComplete="off"
          placeholder="Enter E2B API key..."
        />
        <Button type="button" onClick={handleSave}>
          {isSaved ? "Saved!" : "Save"}
        </Button>
      </div>

      <div className="py-12 flex">
        {/* Yellow vertical line */}
        <div className="w-1 bg-orange-400 mr-6 flex-shrink-0"></div>
        
        {/* Content */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">IMPORTANT</h2>
          <p className="text-sm md:text-base mb-1.5 font-medium">Make sure the API key is correct and have credits.</p>
        </div>
      </div>
    </div>
  );
};


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
    <div className="px-1">
      <div className="flex items-center py-2">
        <div className="h-7 w-7 flex items-center justify-center mr-3">
          <Image src={LLMProviderIcons[llmName]} alt={LLMProviderIcons[llmName] + "-" + "logo"} width={35} height={35} className="rounded-[16px]" />
        </div>
        <div className="flex gap-3 items-center">
          <span className="text-sm font-medium">{llmTitle}</span>
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
  defaultTab = "api-keys"
}: {
  openWindow: boolean;
  windowState: (state: boolean) => void;
  defaultTab?: "api-keys" | "sandbox" | "context7";
}) => {
  const llms = models

  if(!llms) return null;

  return (
    <Dialog open={openWindow} onOpenChange={windowState}>
      <DialogContent className=" max-h-[80vh] overflow-y-auto" tabIndex={-1}>
        <DialogHeader className="space-y-3 hidden">
          <DialogTitle className="text-xl font-normal">
            Enter Your API Keys
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="w-full mb-2 overflow-x-auto">
              <TabsTrigger
                value="api-keys"
                className="text-xs px-2 py-1 truncate"
              >
                API Keys
              </TabsTrigger>
              <TabsTrigger
                value="sandbox"
                className="text-xs px-2 py-1 truncate"
                autoFocus={false}
              >
                Sandbox
              </TabsTrigger>
              <TabsTrigger
                value="context7"
                className="text-xs px-2 py-1 truncate"
                autoFocus={false}
              >
                Context7
              </TabsTrigger>
            </TabsList>

            <div className="h-[400px]">
              <TabsContent value="api-keys" className="h-[21rem] overflow-auto">
                {/* <div className="space-y-2 mb-3">
                  <p className="text-xs font-medium">
                    API keys will be saved in your browser.
                  </p>
                </div> */}
                <div className="space-y-5">
                  {llms.map((model) => (
                    <ApiInput llmTitle={model.title} llmName={model.slug} key={model.id} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="sandbox" className="h-[21rem] overflow-auto">
                <Sandbox/>
              </TabsContent>
              <TabsContent value="context7" className="h-[21rem] overflow-auto">
                <Context7/>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const ApiKeysDialogBtn = ({ children, defaultTab }: { children: ReactNode; defaultTab?: "api-keys" | "sandbox" | "context7"}) => {
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
        defaultTab={defaultTab}
      />
    </>
  );
};
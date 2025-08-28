import { FormEvent, useEffect, useState} from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Loader2, Plus } from "lucide-react";

import { useSWRConfig } from "swr"
import useSWRMutation from 'swr/mutation'

import { createProject } from "@/lib/fetchers";

export const StartProjectDialog = ({openWindow, windowState}: {openWindow: boolean; windowState: (state: boolean) => void;}) => {
  const [projectName, setProjectName] = useState("");
  const {trigger, data, isMutating, reset} = useSWRMutation('/api/project', createProject)
 const { mutate } = useSWRConfig()
  const router = useRouter()

  const startCreatingProject = (e:FormEvent) => {
    e.preventDefault()
    trigger(projectName)
  };

  useEffect(()=>{
    if(data){
      router.push(`/c/${data.chatId}`)
      reset()
      windowState(false)
      mutate("/api/completion/user")
    }
  },[data, router, windowState, reset, mutate])


  return (
    <Dialog open={openWindow} onOpenChange={windowState}>
      <DialogContent className="sm:max-w-md bg-accent text-accent-foreground" tabIndex={-1}>
        
        
        <DialogHeader className="text-left">
          <DialogTitle className="">
            Create Your Project
          </DialogTitle>
          <DialogDescription className="font-medium">
            Create a project with an easy to remember name.
          </DialogDescription>
        </DialogHeader>

        <form 
        onSubmit={startCreatingProject}
        className="space-y-5 mt-1">
          <>
            <Input
              id="project-name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="mt-2"
              maxLength={250}
              minLength={5}
              required
            />
          </>

          {/* Continue Button */}
          <div className="flex flex-col items-center gap-2">
            <Button
            type="submit"
            disabled={projectName.trim().length < 0 || isMutating}
            className="px-6 w-full"
            name="start_project_input"
            >
             {isMutating&&( <Loader2 className="animate-spin"/>)} Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export const StartProjectDialogBtn = () => {
  const [openDialogWindow, setOpenDialogWindow] = useState(false);

  const handleDialogWindowState = (state: boolean) => {
    setOpenDialogWindow(state);
  };

  return (
    <>
      <div role="button">
      <Button  
      size="sm" 
      variant="outline" 
      className="cursor-pointer gap-2"
      onClick={() => handleDialogWindowState(true)}
      >
        Start project <Plus/>
      </Button>
      </div>
      <StartProjectDialog
        openWindow={openDialogWindow}
        windowState={handleDialogWindowState}
      />
    </>
  );
};

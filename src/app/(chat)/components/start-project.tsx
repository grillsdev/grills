import { FormEvent, useEffect, useState} from "react";
import { redirect } from "next/navigation";

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

import useSWRMutation from 'swr/mutation'

import { createProject } from "@/lib/fetchers";

export const StartProjectDialog = ({openWindow, windowState}: {openWindow: boolean; windowState: (state: boolean) => void;}) => {
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<"individual" | "team">("team")
  const {trigger, data, isMutating} = useSWRMutation('/api/project', createProject)

  const startCreatingProject = (e:FormEvent) => {
    e.preventDefault()
    trigger(projectName)
  };

  useEffect(()=>{
    if(data){
      redirect(`/c/${data.chatId}`)
    }
  },[data])


  return (
    <Dialog open={openWindow} onOpenChange={windowState}>
      <DialogContent className="sm:max-w-md" tabIndex={-1}>
        
        
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-normal">
            Create Your Project
          </DialogTitle>
          <DialogDescription>
            Start a new project, Invite the people you need MAX 4
          </DialogDescription>
        </DialogHeader>

        <form 
        onSubmit={startCreatingProject}
        className="space-y-5 mt-3">
          {/* Project Name Input */}
          <>
            <label htmlFor="project-name" className="text-sm font-medium px-1">
              Project Name
            </label>
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

          <div className="flex flex-row items-center gap-3">
            <Button variant={"outline"} type="button" className={`${projectType==="individual"&&"border-4"}`} onClick={()=>setProjectType("individual")}>Individual</Button>
            <Button variant={"outline"} type="button" className={`${projectType==="team"&&"border-4"}`} onClick={()=>setProjectType("team")}>Team</Button>

          </div>

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
        <p className="text-[11px] underline italic text-blue-400 flex flex-row gap-1 items-center tracking-wide font-medium"> Permitted user have right to modify the chat at any time</p>

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

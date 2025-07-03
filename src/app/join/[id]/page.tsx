"use client";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import { useParams, usePathname} from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { getProject, requestAccess } from "@/lib/fetchers";
import { Loader2 } from "lucide-react";


const LoginDialog = ({ open, onOpenChange }: {open:boolean, onOpenChange:(state:boolean)=>void}) => {
    const pathname = usePathname()

    const handleLogin = async () => {
    try {
        await authClient.signIn.social({ 
        provider: "google", 
        callbackURL: `${pathname}` 
        });
    } catch (error) {
        console.error("Login failed:", error);
    }
    };
  return (
    <Dialog open={open} onOpenChange={()=>onOpenChange(!open)}>
      <DialogContent className="p-0">
        <div className="grid grid-cols-2">
          {/* Image Side */}
          <div className="block">
            <Image
              src="/illusion.avif"
              alt="Login Visual"
              className="mt-2 object-cover rounded-l-2xl"
              height={1200}
              width={1200}
            />
          </div>

          {/* Login Side */}
          <div className="flex flex-col justify-center items-start p-6 space-y-4">
            <DialogHeader className="">
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>Login with Google to join this chat.</DialogDescription>
            </DialogHeader>

            <Button
            onClick={handleLogin}
            variant="outline" className="flex items-center gap-2">
              <Image src={"/google.svg"} alt="google-logo" width={16} height={16}/>
              Login with Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


export default function Join() {
  const { id: projectId } = useParams<{ id: string }>();
  const [loginWindow, setLoginWindow] = useState(false)

  const {data:projectData, error, isLoading} = useSWR(`/api/project/${projectId}/join`, getProject)
  const {trigger, isMutating} = useSWRMutation(`/api/project/${projectId}/join`, requestAccess)

  const {data:session} = authClient.useSession()

  const handleSubmit = async() => {
    if(!session){
      return setLoginWindow(true)
    }
    const triggerRequestAccess = await trigger()
    if(triggerRequestAccess===200){
      alert(triggerRequestAccess)
    }
  }

  if(isLoading) return <div>Loading...</div>


  if(error) return <div>404 Not found</div>
  

  return (
    <>
      <nav className="flex flex-row items-center justify-between px-4 py-2 border-b cursor-pointer">
        <span className="font-semibold text-xl">Grills</span>
       {session&&
        <div>
          <span className="text-xs">{session.user.email}</span>
        </div>
       }
      </nav>
      <div className="flex flex-col h-[30rem] items-center justify-center">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-xl tracking-wide text-center">Join now & build {projectData?.title}?</span>
          <Button 
          onClick={handleSubmit}
          disabled={isMutating}
          className="">
            {isMutating&&<Loader2 className="animate-[spin_0.6s_linear_infinite]"/>} Ask to join
          </Button>
        </div>
      </div>

      <LoginDialog open={loginWindow} onOpenChange={setLoginWindow}/>
    </>
  );
}

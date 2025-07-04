"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { authClient } from "@/lib/auth-client";
import { canIEnterInProject, getProject, requestAccess } from "@/lib/fetchers";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (state: boolean) => void;
}) => {
  const pathname = usePathname();

  const handleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `${pathname}`,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
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
              <DialogDescription>
                Login with Google to join this chat.
              </DialogDescription>
            </DialogHeader>

            <Button
              onClick={handleLogin}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Image
                src={"/google.svg"}
                alt="google-logo"
                width={16}
                height={16}
              />
              Login with Google
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function Join() {
  const { id: projectId } = useParams<{ id: string }>();
  const router = useRouter();

  const [loginWindow, setLoginWindow] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  // Refs to track polling state
  const pollCountRef = useRef(0);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: projectData,
    error,
    isLoading,
  } = useSWR(`/api/project/${projectId}/join`, getProject);
  const { trigger, isMutating } = useSWRMutation(
    `/api/project/${projectId}/join`,
    requestAccess
  );
  const {
    trigger: getCurrentUserJoinedData,
  } = useSWRMutation(
    `/api/project/${projectId}/join/detail`,
    canIEnterInProject
  );

  const { data: session } = authClient.useSession();


  const startPolling = () => {
    setIsPolling(true);
    pollCountRef.current = 0;

    pollIntervalRef.current = setInterval(async () => {
      pollCountRef.current += 1;

      try {
        const result = await getCurrentUserJoinedData();
        console.log("CURRENT TRY", pollCountRef.current)

        if (result === true) {
          // User can enter, redirect to project
          console.log("AM I PERMITTED", result)
          clearInterval(pollIntervalRef.current!);
          setIsPolling(false);
          router.push(`/c/${projectId}`);
          return;
        }

        // Check if we've reached the maximum poll count (20 times)
        if (pollCountRef.current >= 20) {
          clearInterval(pollIntervalRef.current!);
          setIsPolling(false);
          toast.error("Admin did not accept your request");
          return;
        }
      } catch (error) {
        console.error("Error during polling:", error);
        // Continue polling even if there's an error, unless max count reached
        if (pollCountRef.current >= 20) {
          clearInterval(pollIntervalRef.current!);
          setIsPolling(false);
          // toast.error("Admin did not accept your request");
        }
      }
    }, 2500); // Poll every 5 seconds
  };

  const handleSubmit = async () => {
    if (!session) {
      return setLoginWindow(true);
    }
    const triggerRequestAccess = await trigger();
    if (triggerRequestAccess === 200) {
      startPolling();
    }
  };

  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>404 Not found</div>;

  return (
    <>
      <nav className="flex flex-row items-center justify-between px-4 py-2 border-b cursor-pointer">
        <span className="font-semibold text-xl">Grills</span>
        {session && (
          <div>
            <span className="text-xs">{session.user.email}</span>
          </div>
        )}
      </nav>
      <div className="flex flex-col h-[30rem] items-center justify-center">
        <div className="flex flex-col gap-3 items-center">
          <span className="text-xl tracking-wide text-center">
            Join now & build {projectData?.title}?
          </span>
          <Button
            onClick={handleSubmit}
            disabled={isMutating || isPolling}
            className=""
          >
            {isMutating && (
              <Loader2 className="animate-[spin_0.6s_linear_infinite]" />
            )}{" "}
            {!isMutating&&!isPolling&&"Ask to join"} {" "}
            {isMutating&&!isPolling&&"Asking"}
            {isPolling && !isMutating &&`Checking for approval...`}
          </Button>
        </div>
      </div>

      <LoginDialog open={loginWindow} onOpenChange={setLoginWindow} />
    </>
  );
}

"use client";

import { ChangeEvent, useEffect, useRef, useState} from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";
import { UserInput } from "../../components/user-input";
import { ChatMessage } from "../../components/message";
import { getApiKey, convertFilesToDataURLs } from "@/lib/utils";
import { $modelObj, $userImage } from "@/store/store";

import { useSidebar } from "@/components/ui/sidebar";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

import { useIsMobile } from "@/hooks/use-mobile";

import Sandbox from "../../components/sandbox";
import useSWR, { useSWRConfig } from "swr";
import { getChats } from "@/lib/fetchers";
import { ChatSkeletonLoader } from "../../components/chat-loader-skeleton";
import { useStore } from "@nanostores/react";
import { $sanboxObj } from "@/store/store";

export default function Chat() {
  const { id: chatId } = useParams<{ id: string }>();

  const [sandboxWindow, setSandboxWindow] = useState(false);
  const [input, setInput] = useState("");

  const lastMessageRef = useRef<HTMLDivElement | null>(null); // We will align this element to the top of the scrollable viewport on updates

  const { setOpen: setSidebar } = useSidebar();
  const { mutate } = useSWRConfig();
  const isMobile = useIsMobile();
  const sb = useStore($sanboxObj);

  const {
    data: messageHistory,
    isLoading: isChatLoading,
    error,
  } = useSWR(`/api/completion/user/chat?chatId=${chatId}`, getChats, {
    errorRetryCount: 0,
    onError(err) {
      if (err.status === 404) {
        // on error mean there is not hostory so most probaly the chat is new and user added gthat chat from homepage and came here after redirecting so automatically send the chat to backend after exracting the the data from localhost
        const isMsgStored = localStorage.getItem("llm-query-state");
        if (isMsgStored) {
          const msg = JSON.parse(isMsgStored) as { chatId: string, message: string, fileParts: [] };
          if(msg.chatId!==chatId) return;
          setInput(msg.message);
          sendMessage({
            role: 'user',
            parts: [{ type: 'text', text: msg.message }, ...msg.fileParts],
          });
          setInput("");
          localStorage.removeItem("llm-query-state");
        }
      } else {
        return toast.error("Something went wrong, please try again later.");
      }
    },
  });


  const { messages, setMessages, sendMessage, status} = useChat({
    transport: new DefaultChatTransport({
      api: `/api/completion`,
      prepareSendMessagesRequest: ({ id, messages }) => {
        const latestModel = $modelObj.get();
        const selectedModel = latestModel.model;
        const apiKey = getApiKey(selectedModel?.llm || "");
        const context7 = localStorage.getItem("grills:context7")

        return {
          body: {
            id,
            chatId,
            messages, 
            llm: selectedModel?.llm,
            model: selectedModel?.model,
            apiKey,
            context7,
            isReasoning: selectedModel?.isReasoning,
          },
        };
      },
    }),
    messages: messageHistory ? messageHistory : [],
    generateId: () => crypto.randomUUID(),
    onFinish: () => {
      const isMsgStored = localStorage.getItem("llm-query-state");
      if (isMsgStored) {
        localStorage.removeItem("llm-query-state");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    // if the message araay is eqwual or less then 2 thats mens title is generated in backend and we have to pull it , bcs its new msg
    if (messages.length === 2 && !sb.isStreaming) {
      mutate("/api/completion/user");
    }
  }, [sb.isStreaming, messages, mutate]);

  useEffect(() => {
    setSidebar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getUserChats() {
      if (!isChatLoading && !error && messageHistory) {
        setMessages(messageHistory);
      }
    }
    getUserChats();
  }, [isChatLoading, messageHistory, error, setMessages]);

  // Keep the most recent message aligned to the top as messages stream in
  // Works with Radix ScrollArea by targeting its internal viewport element
  useEffect(() => {
    if (!lastMessageRef.current) return;

    // Radix ScrollArea renders an internal viewport that actually scrolls
    const viewport = document.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement | null;

    if (viewport) {
      const top = (lastMessageRef.current as HTMLElement).offsetTop;
      viewport.scrollTo({ top, behavior: "smooth" });
    } else {
      // Fallback for non-Radix environments
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages, status]);

  const handleSubmit = async() => {
    if (input.trim()) {
      const userImgObj = $userImage.get()
      const files = userImgObj.images
      const fileParts = files && files.length > 0 ? await convertFilesToDataURLs(files) : [];
      
      if(userImgObj.chatId===chatId && fileParts.length>0){
        sendMessage({
        role: 'user',
        parts: [{ type: 'text', text: input }, ...fileParts],
      })}else{
        sendMessage({text:input})
      }
      setInput("");
    }
  };

  if (isChatLoading && messages.length === 0) return <ChatSkeletonLoader />;

  return (
    <div className="h-[calc(100vh-76px)] flex flex-col">
      <div className="flex-1 min-h-0 flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel
            minSize={40}
            id="chat-panel"
            className={`flex flex-col min-w-0 ${
              isMobile && sandboxWindow && "hidden"
            }`}
          >
            <div className="flex-1 min-h-0 flex flex-col relative">
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full w-full">
                  <div className="py-2 px-4">
                    {messages.map((message, idx) => (
                      <div key={message.id}>
                        <ChatMessage
                          key={message.id}
                          id={message.id}
                          role={message.role}
                          content={message}
                          windowState={sandboxWindow}
                          changeWindowState={setSandboxWindow}
                          isStreaming={
                            status === "streaming" &&
                            message.id === messages[messages.length - 1].id
                          }
                        />
                        {/* auto scroll to the bottm */}
                        <div
                          ref={
                            idx === messages.length - 1 &&
                            status !== "streaming" &&
                            message.role === "user"
                              ? lastMessageRef
                              : undefined
                          }
                          data-last={
                            idx === messages.length - 1 &&
                            status !== "streaming" &&
                            message.role === "user"
                              ? true
                              : undefined
                          }
                        />
                      </div>
                    ))}
                    <div className="h-40"></div>
                  </div>
                </ScrollArea>
              </div>
              <div className="py-2 px-3 absolute bottom-0 w-full flex justify-center">
                <div className="w-full max-w-xl z-0">
                  <UserInput
                    disable={status === "submitted" || status === "streaming"}
                    handleChatSubmit={handleSubmit}
                    handleChatInputChange={(
                      e:
                        | ChangeEvent<HTMLInputElement>
                        | ChangeEvent<HTMLTextAreaElement>
                    ) => setInput(e.target.value)}
                    chatInput={input}
                  />
                </div>{" "}
              </div>
              {/*  */}
            </div>
          </ResizablePanel>

          {sandboxWindow && (
            <>
              <ResizableHandle withHandle className="" />
              <ResizablePanel
                defaultSize={60}
                id="sandpack-panel"
                className="flex flex-col min-w-0 p-1.5 pb-1"
              >
                <div className="h-full w-full overflow-hidden rounded-[16px] border shadow shadow-base-800">
                  <Sandbox changeWindowStateTo={setSandboxWindow} />
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

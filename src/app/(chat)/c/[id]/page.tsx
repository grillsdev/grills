"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";
import { UserInput } from "../../components/user-input";
import { ChatMessage } from "../../components/message";
import { getSelectedModel, getApiKey } from "@/lib/utils";

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
import { $sanboxObj } from "@/store/sandbox";

export default function Chat() {
  const { id: chatId } = useParams<{ id: string }>();

  const [sandboxWindow, setSandboxWindow] = useState(false);
  const [input, setInput] = useState("");

  const lastMessageRef = useRef<HTMLDivElement | null>(null); // We will align this element to the top of the scrollable viewport on updates

  const { setOpen: setSidebar } = useSidebar();
  const { mutate } = useSWRConfig();
  const isMobile = useIsMobile();
  const sb = useStore($sanboxObj);

  const selectedM = getSelectedModel();
  const apiKey = getApiKey(selectedM?.llm || "");

  const {
    data: messageHistory,
    isLoading: isChatLoading,
    error,
  } = useSWR(`/api/completion/user/chat?chatId=${chatId}`, getChats, {
    errorRetryCount: 0,
    onError(err) {
      if (err.status === 404) {
        // on error mean there is not hostory so most probaly the chat is new and user added gthat chat in homepage and came here after redirecting so automatically send the chat t abckend
        const isMsgStored = localStorage.getItem("llm-query-state");
        if (isMsgStored) {
          const msg = JSON.parse(isMsgStored) as { message: string };
          // add a timeout before sending the message// bcs it is itersepting the message array bcs MessageHistory is empty some time but message not
          setInput(msg.message);
          sendMessage({ text: msg.message });
          setInput("");
          localStorage.removeItem("llm-query-state");
        }
      }else{
      return toast.error("Something went wrong, please try again later.");
      }
    },
  });

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/completion",
      body: {
        includeIds: true,
        model: selectedM?.model,
        llm: selectedM?.llm,
        chatId,
        apiKey,
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
    onError: (err: Error) => {
      toast.error(err.message, {
        position: "bottom-right",
      });
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

  const handleSubmit = () => {
    if (input.trim()) {
      sendMessage({ text: input });
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
                      <div
                        key={message.id}
                        // Attach the ref only on the last (newest) message container
                        ref={
                          idx === messages.length - 1
                            ? lastMessageRef
                            : undefined
                        }
                      >
                        {message.parts.map((part, i) => {
                          switch (part.type) {
                            case "text":
                              return (
                                <ChatMessage
                                  key={`${message.id}-${i}`}
                                  id={message.id}
                                  role={message.role}
                                  messageContent={part.text}
                                  windowState={sandboxWindow}
                                  changeWindowStateTo={setSandboxWindow}
                                  isStreaming={
                                    status === "streaming" &&
                                    message.id ===
                                      messages[messages.length - 1].id
                                  }
                                />
                              );
                            default:
                              return null;
                          }
                        })}
                      </div>
                    ))}
                    <div className="h-40"></div>
                  </div>
                </ScrollArea>
              </div>
              <div className="py-2 px-3 absolute bottom-0 w-full flex justify-center">
                <div className="w-full max-w-xl ">
                  <UserInput
                    disable={status === "streaming" || status === "submitted"}
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

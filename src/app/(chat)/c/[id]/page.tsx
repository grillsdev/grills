"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
import useSWR from "swr";
import { getChats } from "@/lib/fetchers";
import { ChatSkeletonLoader } from "../../components/chat-loader-skeleton";

export default function Chat() {
  const selectedM = getSelectedModel();
  const apiKey = getApiKey(selectedM?.llm || "");
  const { id: chatId } = useParams<{ id: string }>();
  const { setOpen: setSidebar } = useSidebar();
  const [sandboxWindow, setSandboxWindow] = useState(false);
  const [input, setInput] = useState("");
  const isMobile = useIsMobile();
  const {
    data: messageHistory,
    isLoading: isChatLoading,
    error,
  } = useSWR(`/api/completion/user/chat?chatId=${chatId}`, getChats);

  const { messages, setMessages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/completion",
      body: {
        includeIds: true,
        chatId: chatId,
        model: selectedM?.model,
        llm: selectedM?.llm,
        apiKey: apiKey,
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
    setSidebar(false);
    const isMsgStored = localStorage.getItem("llm-query-state");
    if (isMsgStored) {
      const msg = JSON.parse(isMsgStored) as { message: string };
      if (msg.message.trim() === "") return;
      setInput(msg.message);
    }
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

  const handleSubmit = () => {
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
  };

  if (isChatLoading) return <ChatSkeletonLoader />;
  if (error && error.status === 404) {
    return (
      <main
        role="main"
        aria-labelledby="not-found-title"
        className="flex items-center justify-center p-4 h-[40rem]"
      >
        <section className="flex w-full max-w-xl flex-col items-center text-center gap-4 md:gap-6">
          <h1 className="text-3xl font-medium">404 Not Found</h1>
        </section>
      </main>
    );
  }

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
                  <div className="px-4">
                    {messages.map((message) => (
                      <div key={message.id}>
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
                              )
                            default:
                              return null;
                          }
                        })}
                      </div>
                    ))}
                    {/* <ThemeDialogSection/> */}
                    <div className="h-32"></div>
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

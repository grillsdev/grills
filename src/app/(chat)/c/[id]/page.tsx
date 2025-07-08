"use client";

import { useEffect, useState } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ScrollArea } from "@/components/ui/scroll-area";
import { UserInput } from "../../components/user-input";
import { ChatMessage } from "../../components/message";
import { getSelectedModel, getApiKey } from "@/lib/utils";

import useSWRSubscription from "swr/subscription";
import { SSEChatCompletion } from "@/lib/types";
import { type Message } from "@ai-sdk/react";

import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

import Sandbox from "../../components/sandbox";

export default function Chat() {
  const selectedM = getSelectedModel();
  const apiKey = getApiKey(selectedM?.llm || "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEventStreaming, setIsEventStreaming] = useState(false);
  const { id: chatId } = useParams<{ id: string }>();
  const { setOpen: setSidebar } = useSidebar();
  const [showSandpack, setShowSandpack] = useState(false);
  const isMobile = useIsMobile();

  const {
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    complete,
    setInput,
  } = useCompletion({
    streamProtocol: "data",
    api: `/api/completion`,
    body: {
      messages: messages,
      chatId: chatId,
      model: selectedM?.model,
      llm: selectedM?.llm,
      apiKey: apiKey,
    },
    onError: (err: Error) => {
      toast.error(JSON.parse(err.message), {
        position: "bottom-right",
      });
    },
    onFinish: () => {
      const isMsgStored = localStorage.getItem("llm-query-state");
      if (isMsgStored) {
        localStorage.removeItem("llm-query-state");
      }
    },
  });

  // Handle stored messages
  useEffect(() => {
    const isMsgStored = localStorage.getItem("llm-query-state");
    if (isMsgStored && !isLoading) {
      try {
        const msg = JSON.parse(isMsgStored);
        if (msg?.message) {
          complete(msg.message).finally(() => {
            localStorage.removeItem("llm-query-state");
          });
        }
      } catch (error) {
        console.error("Error processing stored message:", error);
        localStorage.removeItem("llm-query-state");
      }
    }
  }, [isLoading, complete]);

  useEffect(() => {
    setSidebar(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {} = useSWRSubscription(
    `/api/completion?chatId=${chatId}`,
    (
      key: string,
      {
        next,
      }: { next: (error: Error | null, data?: SSEChatCompletion) => void }
    ) => {
      const es = new EventSource(key);
      es.addEventListener("message", ({ data }) => {
        const newData: SSEChatCompletion = JSON.parse(data);
        if (newData.role === "user") {
          setIsEventStreaming(true);
          setInput("");
          setMessages((prevMsg) => [
            ...prevMsg,
            {
              id: newData.id,
              role: newData.role,
              content: newData.content,
              createdAt: newData.createdAt,
            },
          ]);
        }
        if (newData.role === "assistant") {
          setMessages((prevMsg) => {
            const existingMsgIndex = prevMsg.findIndex(
              (message) => message.id === newData.id
            );
            console.log(existingMsgIndex);
            if (existingMsgIndex !== -1) {
              // Update existing message
              const updatedMessages = [...prevMsg];
              updatedMessages[existingMsgIndex] = {
                id: newData.id,
                role: newData.role,
                content: newData.content,
                createdAt: newData.createdAt,
              };
              return updatedMessages;
            } else {
              // Add new message
              return [
                ...prevMsg,
                {
                  id: newData.id,
                  role: newData.role,
                  content: newData.content,
                  createdAt: newData.createdAt,
                },
              ];
            }
          });
        }
        if (newData.role === "assistant" && newData.type === "chat_completed") {
          setIsEventStreaming(false);
        }
        next(null, data);
      });
      es.addEventListener("error", () => next(new Error("Fetch Error")));
      return () => es.close();
    }
  );

  return (
    <div className="h-[calc(100vh-76px)] flex flex-col">
      <div className="flex-1 min-h-0 flex flex-col">
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel
            defaultSize={showSandpack ? 50 : 100}
            minSize={30}
            id="chat-panel"
            className={`flex flex-col min-w-0 ${isMobile&&showSandpack&&"hidden"}`}
          >
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="flex-1 overflow-hidden">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setShowSandpack(!showSandpack)}
                >
                  <Code size={16} />
                  {showSandpack ? "Hide" : "Show"} Code Editor
                </Button>
                <ScrollArea className="h-full w-full">
                  <div className="p-4">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        id={message.id}
                        message={message}
                        isStreaming={
                          isLoading &&
                          messages[messages.length - 1]?.id === message.id
                        }
                      />
                    ))}
                    <div className="h-4"></div>
                  </div>
                </ScrollArea>
              </div>

              <div className="py-2 px-3 bottom-0  flex flex-col items-center w-full">
                <div className="w-full max-w-xl">
                  <UserInput
                    disable={isLoading || isEventStreaming}
                    handleChatSubmit={handleSubmit}
                    handleChatInputChange={handleInputChange}
                    chatInput={input}
                  />
                </div>
              </div>
              {/*  */}
            </div>
          </ResizablePanel>

          {showSandpack && (
            <>
              <ResizableHandle withHandle className="" />
              <ResizablePanel
              defaultSize={50} // A neutral default
            minSize={showSandpack ? 30 : 0} // Set minSize to 0 when hidden, effectively collapsing it
            id="sandpack-panel"
                className="flex flex-col min-w-0 p-1.5 pb-1"
              >
                <div className="h-full w-full overflow-hidden rounded-[16px] border shadow shadow-base-800">
                  <Sandbox changeWindowStateTo={setShowSandpack} chatId={chatId}/>
                </div>
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}

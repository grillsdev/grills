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
import { v4 as uuid } from "uuid";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

import Sandbox from "../../components/sandbox";
import useSWRMutation from "swr/mutation";
import { getChats } from "@/lib/fetchers";
import { ChatSkeletonLoader } from "../../components/chat-loader-skeleton";

export default function Chat() {
  const selectedM = getSelectedModel();
  const apiKey = getApiKey(selectedM?.llm || "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isEventStreaming, setIsEventStreaming] = useState(false);
  const { id: chatId } = useParams<{ id: string }>();
  const { setOpen: setSidebar } = useSidebar();
  const [sandboxWindow, setSandboxWindow] = useState(false);
  const isMobile = useIsMobile();
  const { trigger, isMutating: isChatLoadiong } = useSWRMutation(
    `/api/completion/user/chat?chatId=${chatId}`,
    getChats
  );

  const { input, handleInputChange, handleSubmit, isLoading, setInput } =
    useCompletion({
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
        toast.error(err.message, {
          position: "bottom-right",
        });
        setIsEventStreaming(false);
      },
      onFinish: () => {
        const isMsgStored = localStorage.getItem("llm-query-state");
        if (isMsgStored) {
          localStorage.removeItem("llm-query-state");
        }
      },
    });

  useEffect(() => {
    setSidebar(false);
    const isMsgStored = localStorage.getItem("llm-query-state");
    if (isMsgStored) {
      const msg = JSON.parse(isMsgStored) as { message: string };
      if (msg.message.trim() === "" )return;
      setInput(msg.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getUserChats() {
      const chats = await trigger();
      setMessages(chats);
    }
    getUserChats();
  }, [trigger]);

  const { error } = useSWRSubscription(
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
        if (newData.role === "user" || newData.role === "assistant") {
          if(!isEventStreaming){
            setIsEventStreaming(true);
          }
          setMessages((prevMsg) => {
            const existingMsgIndex = prevMsg.findIndex(
              (message) => message.id === newData.id
            );
            if (existingMsgIndex !== -1) {
              // Update existing message
              const updatedMessages = [...prevMsg];
              updatedMessages[existingMsgIndex] = {
                ...updatedMessages[existingMsgIndex], // Keep existing data
                content: newData.content,
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

  const handleSubmitAndAppendUserMesg = () => {
    const userMsgId = `usr-${uuid()}`;
    const newMessage = messages
    messages.push({
        id: userMsgId,
        role: "user",
        content: input,
        createdAt: new Date(),
    })
    setMessages(newMessage);
    handleSubmit()
    setInput("")
  };

  if (error) return window.location.reload();

  if (isChatLoadiong) return <ChatSkeletonLoader />;
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
                  <div className="p-4">
                    {messages?.map((message) => (
                      <ChatMessage
                        key={message.id}
                        id={message.id}
                        message={message}
                        isStreaming={
                          isLoading &&
                          messages[messages.length - 1]?.id === message.id
                        }
                        changeWindowStateTo={setSandboxWindow}
                        windowState={sandboxWindow}
                      />
                    ))}
                    {/* <ThemeDialogSection/> */}
                    <div className="h-32"></div>
                  </div>
                </ScrollArea>
              </div>
              <div className="py-2 px-3 absolute bottom-0 w-full flex justify-center">
                <div className="w-full max-w-xl ">
                  <UserInput
                    disable={isLoading}
                    handleChatSubmit={handleSubmitAndAppendUserMesg}
                    handleChatInputChange={handleInputChange}
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

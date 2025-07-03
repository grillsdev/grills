'use client'

import { useEffect, useState, useRef, useCallback } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserInput } from "../../components/user-input";
import { ChatMessage } from "../../components/message";
import { getSelectedModel, getApiKey } from "@/lib/utils";

import { UserChatBtn } from "../../components/user-chat";

// Type definitions
interface ChatMessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  type?: string;
}

export default function Chat() {
  const selectedM = getSelectedModel();
  const apiKey = getApiKey(selectedM?.llm || "");
  const eventSourceRef = useRef<EventSource | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const { id: chatId } = useParams<{ id: string }>();
  
  const { 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    complete 
  } = useCompletion({
    streamProtocol: "data",
    api: `/api/completion`,
    body: {
      messages: messages,
      chatId: chatId,
      model: selectedM?.model,
      llm: selectedM?.llm,
      apiKey: apiKey
    },
    onError: (err: Error) => {
      toast.error(JSON.parse(err.message), {
        position: "bottom-right"
      });
    },
    onFinish: () => {
      const isMsgStored = localStorage.getItem('llm-query-state');
      if (isMsgStored) {
        localStorage.removeItem('llm-query-state');
      }
    },
  });

  // Handle stored messages
  useEffect(() => {
    const isMsgStored = localStorage.getItem('llm-query-state');
    if (isMsgStored && !isLoading) {
      try {
        const msg = JSON.parse(isMsgStored);
        if (msg?.message) {
          complete(msg.message).finally(() => {
            localStorage.removeItem('llm-query-state');
          });
        }
      } catch (error) {
        console.error('Error processing stored message:', error);
        localStorage.removeItem('llm-query-state');
      }
    }
  }, [isLoading, complete]);

  // Handle SSE connection
  const setupEventSource = useCallback(() => {
    if (!chatId) return null;

    const eventSource = new EventSource(`/api/completion?chatId=${chatId}`);
    
    eventSource.onmessage = ({data}) => {
      try {
        // const message = JSON.parse(event.data) as ChatMessageType;
        // setMessages(prev => [...prev, message]);
        console.log(data)
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    eventSource.onerror = (event: Event) => {
      console.log("SSE connection error", event);
      window.location.reload()
      
      // if (eventSource.readyState === EventSource.CLOSED) {
      //   console.log("Connection closed, attempting to reconnect...");
      //   setTimeout(() => {
      //     if (chatId) {
      //       const newEventSource = setupEventSource();
      //       if (newEventSource && eventSourceRef.current) {
      //         eventSourceRef.current = newEventSource;
      //       }
      //     }
      //   }, 2000);
      // }
    };

    return eventSource;
  }, [chatId]);

  // Initialize SSE connection
  useEffect(() => {
    if (!chatId) return;
    
    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    
    // Create new connection
    const newEventSource = setupEventSource();
    if (newEventSource) {
      eventSourceRef.current = newEventSource;
    }
    
    // Cleanup function
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [chatId, setupEventSource]);

  return (
    <>
    <UserChatBtn/>
     <div className="flex items-stretch h-[calc(100vh-76px)]">
      <div className="flex-1 transition-all duration-300 max-w-full">
        <div className="h-full flex flex-col">
          <ScrollArea className="flex-1 h-[26rem] w-full">
            {messages.map((message) => (
              <ChatMessage key={message.id} id={message.id} message={message} />
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <div className="py-2 px-3 absolute bottom-0 w-full">
            <div className="w-full max-w-xl place-self-center">
              <UserInput
                disable={isLoading}
                handleChatSubmit={handleSubmit}
                handleChatInputChange={handleInputChange}
                chatInput={input}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
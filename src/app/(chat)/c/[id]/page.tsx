'use client'
import { useEffect, useState } from "react";
import { type Message, useCompletion } from "@ai-sdk/react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserInput } from "../../components/user-input";

// import useSWR, {useSWRConfig} from "swr";


import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ChatMessage } from "../../components/message";

import { getSelectedModel, getApiKey } from "@/lib/utils";


//   const { mutate: mutateTitle } = useSWRConfig()

//   const { data: chatHis, isLoading: isFetchingChatHistory, mutate } = useSWR<Message[]>(
//     `/ai/thread/${id}`,
//     getChatHistory, {
//       shouldRetryOnError:false,
//       fallbackData: [] //initialized it with empty array
//     }
//   );

export default function Chat(){
  const [messageHis, setMessageHis] = useState<Message[]>([])
  const selectedM = getSelectedModel()
  const apiKey = getApiKey(selectedM?.llm || "")
  

  const { id:chatId } = useParams()
  const {completion, input, handleInputChange, handleSubmit, isLoading, complete} = useCompletion({
      streamProtocol: "data",
      api: `/api/completion`,
      body: {
        messages: messageHis,
        chatId:chatId,
        model:selectedM?.model,
        llm:selectedM?.llm,
        apiKey:apiKey
      },

      // prompt, chatId, messages, llm, apiKey, model
      onError: (err:Error)=>{
      toast.error(err.message, {
        position:"bottom-right"
      })
      },

      onFinish: ()=>{
      const isMsgStored = localStorage.getItem('llm-query-state')
      if(isMsgStored){
        localStorage.removeItem('llm-query-state')
      }},

    });


    useEffect(()=>{
      // get local ost set sinput clickcomplete
      const isMsgStored = localStorage.getItem('llm-query-state')
      if(isMsgStored){
        const msg = JSON.parse(isMsgStored)
        complete(msg.message)
      }
    },[complete])


 // mutate the title which is just created
//  ===2 meaning that just new set of initials msg arrived
//   useEffect(()=>{
//     if(chatHis&&chatHis.length===2){
//       mutateTitle(`${api}/ai/threads`).catch(console.log)
//     }
//   },[chatHis])




  
  useEffect(() => {
    if (!chatId) return;

    let eventSource: EventSource | null = null;
    let shouldReconnect = true;

    const connectToStream = () => {
      if (eventSource) eventSource.close();

      eventSource = new EventSource(`/api/completion?chatId=${chatId}`, {
        withCredentials: true,
      });

      eventSource.onmessage = ({data}) => {
        console.log("data:", data)
        // const extractStreamText = extractMessageFromStream(data as string)
        // if(!extractStreamText)  return 


        // if(extractStreamText.type==="user_input"){
        //   mutate((messages) => {
        //     return [...(messages || []), { id: extractStreamText.id, role: 'user', content: extractStreamText.content }];
        //   }, false).catch(console.log);
        // }
        
        // if (extractStreamText.type === "chat_streaming") {
        //   mutate((messages) => {
        //     const currentMessages = messages || [];
        //     const messageIndex = currentMessages.findIndex(msg => msg.id === extractStreamText.id);

        //     if (messageIndex !== -1) {
        //       // Update existing message
        //       const updatedMessages = [...currentMessages];
        //       updatedMessages[messageIndex] = {
        //         ...updatedMessages[messageIndex],
        //         content: extractStreamText.content
        //       };
        //       return updatedMessages;

        //     } else {
        //       return [
        //         ...currentMessages,
        //         { id: extractStreamText.id, role: 'assistant', content: extractStreamText.content }
        //       ];
        //     }
        //   }, false).catch(console.log);
        // }

        // if(extractStreamText?.type==="chat_completed"){
        //   db.messages.put({id: chatId, messages:chatHis!}).catch(console.log)
        // }

      };

      eventSource.onerror = (error: Event) => {
        console.error("SSE connection error", error);
        eventSource?.close();

        if (shouldReconnect) {
          setTimeout(connectToStream, 2000); // 2s retry
        }
      };

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      };

    };

    connectToStream();

    // A/B test this for background streaming
    return () => {
      shouldReconnect = false;
      if (eventSource) eventSource.close();
    };
  }, [chatId]);


  // console.log(chatHis)


  return (
    <div className="flex items-stretch h-[calc(100vh-76px)]">
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 max-w-full`}>
        <div className="h-full flex flex-col">
          <ScrollArea className="flex-1 h-[26rem] w-full">
            {messageHis?.map((message) => (
              <ChatMessage key={message.id} id={message.id} message={message} />
            ))}

            <ScrollBar orientation="vertical" />
          </ScrollArea>
          {/* <h1>
            {completion}
          </h1> */}
          <div className="py-2 px-3 absolute bottom-0 w-full">
            <div className="w-full max-w-xl place-self-center">
              <UserInput
                // disable={isFetchingChatHistory || isLoading}
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
  );
};
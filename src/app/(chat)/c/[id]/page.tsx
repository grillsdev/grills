'use client'
// import { useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";

// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UserInput } from "../../components/user-input";

// import useSWR, {useSWRConfig} from "swr";


// import { ChatMessage } from "../../components/message";
import { useParams } from "next/navigation";
import { useEffect } from "react";



export default function Chat(){
    const { id } = useParams()
//   const { mutate: mutateTitle } = useSWRConfig()

//   const { data: chatHis, isLoading: isFetchingChatHistory, mutate } = useSWR<Message[]>(
//     `/ai/thread/${id}`,
//     getChatHistory, {
//       shouldRetryOnError:false,
//       fallbackData: [] //initialized it with empty array
//     }
//   );
  const {completion, input, handleInputChange, handleSubmit, isLoading, setInput, complete} = useCompletion({
      streamProtocol: "data",
      api: `/api/completion`,
      body: {
        messages: id,
        chatId:id
      },
      onError: (err:Error)=>{
        console.log(err)
      },
      onFinish: (red)=>{
      console.log("~~~RES~~~~~~", red)
      }
    });

    console.log(completion)

    useEffect(()=>{
      // get local ost set sinput clickcomplete
      const isMsgStored = localStorage.getItem('llm-query-state')
      if(isMsgStored){
      console.log("IS MSG STORE", isMsgStored)
        const msg = JSON.parse(isMsgStored)
        complete(msg.message)
      }
    },[])

 // mutate the title which is just created
//  ===2 meaning that just new set of initials msg arrived
//   useEffect(()=>{
//     if(chatHis&&chatHis.length===2){
//       mutateTitle(`${api}/ai/threads`).catch(console.log)
//     }
//   },[chatHis])


//   useEffect(() => {
//     // if the user came from homepage append the input and subit in order to get the automtic answer
//     const newState = location.state as { chat?: string } | undefined;
//     async function appendUserInput() {
//       //cc is just tracking this fun running time should me alway 0 then 1 then done
//       if (newState?.chat) {
//         const userInput = newState.chat;
//         await navigate(location.pathname, { replace: true });
//         await complete(userInput);
//         return;
//       }
//     }

//     if (!isLoading && newState?.chat) {
//       appendUserInput().catch((err) =>
//         console.log("error while appending", err)
//       );
//     }
//   }, [location, isLoading, complete, navigate]);

  
//   useEffect(() => {
//     if (!chatId) return;

//     let eventSource: EventSource | null = null;
//     let shouldReconnect = true;

//     const connectToStream = () => {
//       if (eventSource) eventSource.close();

//       eventSource = new EventSource(`${api}/ai/stream/${chatId}`, {
//         withCredentials: true,
//       });

//       eventSource.onmessage = ({data}) => {
//         const extractStreamText = extractMessageFromStream(data as string)
//         if(!extractStreamText)  return 


//         if(extractStreamText.type==="user_input"){
//           mutate((messages) => {
//             return [...(messages || []), { id: extractStreamText.id, role: 'user', content: extractStreamText.content }];
//           }, false).catch(console.log);
//         }
        
//         if (extractStreamText.type === "chat_streaming") {
//           mutate((messages) => {
//             const currentMessages = messages || [];
//             const messageIndex = currentMessages.findIndex(msg => msg.id === extractStreamText.id);

//             if (messageIndex !== -1) {
//               // Update existing message
//               const updatedMessages = [...currentMessages];
//               updatedMessages[messageIndex] = {
//                 ...updatedMessages[messageIndex],
//                 content: extractStreamText.content
//               };
//               return updatedMessages;

//             } else {
//               return [
//                 ...currentMessages,
//                 { id: extractStreamText.id, role: 'assistant', content: extractStreamText.content }
//               ];
//             }
//           }, false).catch(console.log);
//         }

//         // if(extractStreamText?.type==="chat_completed"){
//         //   db.messages.put({id: chatId, messages:chatHis!}).catch(console.log)
//         // }

//       };

//       eventSource.onerror = (error: Event) => {
//         console.error("SSE connection error", error);
//         eventSource?.close();

//         if (shouldReconnect) {
//           setTimeout(connectToStream, 2000); // 2s retry
//         }
//       };

//       eventSource.onopen = () => {
//         console.log("SSE connection opened");
//       };
//     };

//     connectToStream();

//     // A/B test this for background streaming
//     return () => {
//       shouldReconnect = false;
//       if (eventSource) eventSource.close();
//     };
//   }, [chatId]);


  // console.log(chatHis)


  return (
    <div className="flex items-stretch h-[calc(100vh-76px)]">
      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 max-w-full`}>
        <div className="h-full flex flex-col">
          {/* <ScrollArea className="flex-1 h-[26rem] w-full">
            {chatHis?.map((message) => (
              <ChatMessage key={message.id} id={message.id} message={message} />
            ))}

            <ScrollBar orientation="vertical" />
          </ScrollArea> */}
          <h1>
            {completion}
          </h1>

          <div className="py-2 px-3">
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
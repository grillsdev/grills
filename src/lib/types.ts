import type {Message} from "@ai-sdk/react";

export interface Model{
  id:string
  title:string;
  name:string
}

export interface LLM{
  id:string
  title:string
  name:string
}

export interface AvailableModels{
  id:string
  title:string
  name:string
  models:Model[]
}

// {llm: "gemini", model:"flash-2.0", modelTitle: "Flash 2.0"}
export interface CurrentModel{
  llm:string
  model:string
  modelTitle:string
}

export interface MessageProps{
  message:Message;
  isStreaming:boolean;
  id:string
  changeWindowStateTo:(state:boolean) => void
}

// export interface ThreadOverview{
//   id:string;
//   title:string;
//   isPublic:boolean;
//   updatedAt:Date
// }

// export type GetThreads = {
//   threads: ThreadOverview[]
// }

/**
 * {role: 'assistant', id: 'msg-37b2946a-a6f2-41bc-a413-58da672e5de4', content: 'Hello! How can I assist you', createdAt: '2025-07-05T00:13:00.768Z', type: 'chat_streaming'}
 */

export type ChatHistory = {
  chats: Message[]
}

export type Streaming = Message & {
  type: "user_input" | "chat_streaming" | "chat_completed"
}

export interface SSEChatCompletion{
  id:string
  content:string
  createdAt:Date
  role: "user" | "assistant"
  type: "user_input" | "chat_streaming" | "chat_completed"
}

export type LLMProvider = "openai" | "gemini" | "openrouter" | "groq";

export interface CompletionRequest {
  prompt: string;
  chatId: string;
  messages: Message[];
  llm: LLMProvider;
  apiKey: string;
  model: string;
}

export interface CreateChatRequest {
  title?:string
}

export interface ProjectDetailRequest {
  id:string;
  chatId:string;
  title:string;
  admin:string;
  user:string;
  type:string;
  createdAt:Date;
  updatedAt:Date;
}

/**
 *  const requestObj = {
      userRequested:userId,
      requestedPRoject: projectId,
      admin:adminId,
      type: "access_request"
    }
 */

export interface ProjectAccessRequest {
  id:string
  userRequested:string
  userRequestedName:string
  requestedProject:string
  requestedProjectTitle:string
  admin:string,
  type: "request_access" | "grant_access"
}

export interface SandboxStoreInterface{
  id:string //perticular message id 
  code:string
}
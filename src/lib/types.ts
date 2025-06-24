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
  isStreaming?:boolean;
  id:string
}

export interface ThreadOverview{
  id:string;
  title:string;
  isPublic:boolean;
  updatedAt:Date
}

export type GetThreads = {
  threads: ThreadOverview[]
}

export interface ForkThread{
  newThreadId:string
}

export type ChatHistory = {
  chats: Message[]
}

export type Streaming = Message & {
  type: "user_input" | "chat_streaming" | "chat_completed"
}
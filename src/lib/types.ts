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
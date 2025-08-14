import type { UIMessage } from "@ai-sdk/react";
import { z } from "zod";

export interface Model {
  id: string;
  title: string;
  name: string;
}

export interface LLM {
  id: string;
  title: string;
  name: string;
}

export interface AvailableModels {
  id: string;
  title: string;
  name: string;
  models: Model[];
}

// {llm: "gemini", model:"flash-2.0", modelTitle: "Flash 2.0"}
export interface CurrentModel {
  llm: string;
  model: string;
  modelTitle: string;
}

export interface MessageProps {
  role: "system" | "user" | "assistant";
  messageContent: string;
  isStreaming: boolean;
  id: string;
  changeWindowStateTo: (state: boolean) => void;
  windowState: boolean;
}

export interface UserProjectOverview {
  id: string;
  chatId: string;
  title: string;
  admin: string;
  type: "admin" | "joined" | "forked";
  createdAt: Date;
  updatedAt: Date;
}

export type ChatHistory = {
  chats: UIMessage[];
};

export type Streaming = Message & {
  type: "user_input" | "chat_streaming" | "chat_completed";
};

export interface SSEChatCompletion {
  id: string;
  content: string;
  createdAt: Date;
  role: "user" | "assistant";
  type: "user_input" | "chat_streaming" | "chat_completed";
}

export type LLMProvider = "openai" | "gemini" | "openrouter" | "togetherai" | "groq";

export interface CompletionRequest {
  chatId: string;
  messages: UIMessage[];
  llm: LLMProvider;
  apiKey: string;
  model: string;
}

export interface CreateChatRequest {
  title?: string;
}

export interface ProjectDetailRequest {
  id: string;
  chatId: string;
  title: string;
  admin: string;
  user: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectAccessRequest {
  id: string;
  userRequested: string;
  userRequestedName: string;
  requestedProject: string;
  requestedProjectTitle: string;
  admin: string;
  type: "request_access" | "grant_access";
}

export interface SandboxStoreInterface {
  id: string; //perticular message id
  code: string;
  isStreaming: boolean;
  pkg?: string[];
  type?: "btn";
}

export interface GeneratedCodeContent {
  pre_code: string;
  code: string;
  post_code: string;
  pkgs: string[];
}

export const themeSchema = z.object({
  name: z.string().describe("Name of the theme, max lenght should be 9 Char."),
  color: z.string().describe("Primary color of the theme in hex format"),
  data: z.string().describe("Return the whole theme"),
  isValid: z.boolean().describe("Is user submited theme is valid or not")
});


export interface CreateThemeContext {
  llm:string
  apiKey:string
  content:string
}

export interface SavedTheme {
  id:string,
  name:string,
  color:string,
  data:string,
  createdAt:Date
}

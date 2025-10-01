import axios from "axios"

import { ProjectAccessRequest, ProjectDetailRequest, SavedTheme, UserProjectOverview } from "./types";
import type { UIMessage } from "ai";



export const getUserProjects = async (url: string): Promise<UserProjectOverview[]> => {
  const response = await axios.get<{ projects: UserProjectOverview[] }>(url)
  return response.data.projects
}

// project -> parent container of the chat or u can say alternative name 
export const amIAdmin = async (url: string): Promise<{ chatId: string }> => {
  const response = await axios.get<{ chatId: string }>(url)
  return response.data
}

export const getProject = async (url: string): Promise<ProjectDetailRequest> => {
  const response = await axios.get(url)
  return response.data
}

export const requestAccess = async (url: string): Promise<number> => {
  const response = await axios.post(url, {})
  return response.status
}

export const canIEnterInProject = async (url: string): Promise<boolean> => {
  const response = await axios.get(url)
  if (response.status === 200) return true
  return false
}

export const acceptAccessRequest = async (url: string, { arg }: { arg: ProjectAccessRequest }): Promise<number> => {
  const response = await axios.post(url, arg)
  return response.status
}

export const getChats = async (url: string): Promise<UIMessage[]> => {
  const response = await axios.get<{ messages: UIMessage[] }>(url)
  return response.data.messages
}

export const getSavedTheme = async (url: string): Promise<SavedTheme[]> => {
  const response = await axios.get(url)
  return response.data
}

export const saveDaytonaAPIKey = async (url: string, arg: { arg: string }): Promise<{ daytonaAPIKey: string, sandboxId: string }> => {
  const response = await axios.post(url, { daytonaAPIKey: arg.arg })
  return response.data
}

export const executeSandboxCode = async (
  url: string,
  { arg }: { arg: { sandboxAPI: string; msgId: string; code: Record<string, string>, css:string } }
): Promise<{ previewUrl: string }> => {
  try {
    const response = await axios.post<{ previewUrl: string }>(url, arg);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Throw a more descriptive error
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.error ||
        error.message;
      throw new Error(errorMessage);
    }
    throw error;
  }
};
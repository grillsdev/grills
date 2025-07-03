import axios from "axios"

import { AvailableModels, ProjectDetailRequest } from "./types";


export const getModels = async (url: string): Promise<AvailableModels[]> => {
  const response = await axios.get<AvailableModels[]>(url);
  return response.data;
};

// arg is the title here
export const createProject = async(url:string, { arg }: { arg: string }): Promise<{chatId:string}> => {
  const response = await axios.post<{chatId:string}>(url, {
    title:arg
  })
  return response.data
}

// project -> parent container of the chat or u can say alternative name 
export const amIAdmin = async(url:string): Promise<{chatId:string}> => {
  const response = await axios.get<{chatId:string}>(url)
  return response.data
}

export const getProject = async(url:string): Promise<ProjectDetailRequest> => {
  const response = await axios.get(url)
  return response.data
}

export const requestAccess = async(url:string):Promise<number> => {
  const response = await axios.post(url, {})
  return response.status
}
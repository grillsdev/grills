import axios from "axios"

import { AvailableModels, ProjectAccessRequest, ProjectDetailRequest } from "./types";


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

export const canIEnterInProject = async(url:string):Promise<boolean> => {
  const response = await axios.get(url)
  if(response.status===200) return true
  return false
}

export const acceptAccessRequest = async(url:string, {arg}: {arg: ProjectAccessRequest}):Promise<number> => {
  const response = await axios.post(url, arg)
  return response.status
}
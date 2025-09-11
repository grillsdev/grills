import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { CurrentModel, SavedTheme, LLMProvider } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const saveKeys = (llm: string, key: string) => {
  const haveKeys = localStorage.getItem("llmKeys");

  if (!haveKeys) {
    const newKeys = { [llm]: key };
    return localStorage.setItem("llmKeys", JSON.stringify(newKeys));
  }

  // eslint-disable-next-line prefer-const
  let existingKeys = JSON.parse(haveKeys) as Record<string, string>;
  existingKeys[llm] = key;

  localStorage.setItem("llmKeys", JSON.stringify(existingKeys));
};

// saveKeys("gemini", "123456")
export const getApiKeys = (): Record<string, string> | null => {
  const keys = localStorage.getItem("llmKeys");
  return keys ? (JSON.parse(keys) as Record<string, string>) : null;
};

export const getApiKey = (llm: string): string | null => {
  const keys = getApiKeys();
  return keys ? keys[llm] : null;
};

export const getSelectedModel = (): CurrentModel | null => {
  // Only access localStorage if we're in the browser
  if (typeof window !== "undefined") {
    const getCurrentModel = localStorage.getItem("selected-model");
    if (getCurrentModel) {
      const selectedModel = JSON.parse(getCurrentModel) as CurrentModel;
      return selectedModel;
    }
    return null;
  }
  return null;
};

export const LLMProviderIcons: Record<string, string> = {
  openai: "/chatgpt-icon.svg",
  anthropic: "/anthropic-icon.svg",
  gemini: "/gemini-icon.svg",
  openrouter: "/openrouter.jpeg",
  togetherai: "/togetherai.png",
  groq: "/groq.png",
  grok: "/grok.svg"
};

export const LLMsOpenAICompatibleEndpoint: Record<LLMProvider, string> = {
  openai: "https://api.openai.com/v1",
  gemini: "https://generativelanguage.googleapis.com/v1beta/openai/",
  openrouter: "https://openrouter.ai/api/v1",
  togetherai: "https://api.together.xyz/v1",
  groq: "https://api.groq.com/openai/v1",
  anthropic: "https://api.anthropic.com/openai/v1"
};

export const getLocalSavedTheme = (): SavedTheme | null => {
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    return JSON.parse(savedTheme) as SavedTheme;
  }
  return null;
};

export async function getPromptTxt(): Promise<string> {
  const fileUrl = "https://bucket.grills.dev/prompt.txt";

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      return "";
    }
    const textContent = await response.text();
    return JSON.stringify(textContent);

    // For JSON:
    // const jsonData = await response.json();
    // return new Response(JSON.stringify(jsonData));
  } catch (error) {
    console.log(error);
    return "";
  }
}

export const getPackageLockFile = (): string | null => {
  const savedFile = localStorage.getItem("lockFile");
  if (savedFile) {
    return savedFile;
  }
  return null;

}

export const savePackageLockFile = (file:string) => {
  localStorage.setItem("lockFile", file)
}

export function getSandboxURL(): string {
  if (typeof window !== "undefined") {
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    if (isLocalhost) {
      return "http://localhost:8080/api/v1/sandbox/create";
    }
  }

  return "https://grills-sandbox-28op1.sevalla.app/api/v1/sandbox/create";
}
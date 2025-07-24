import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { CurrentModel, SavedTheme, LLMProvider} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  return keys ? keys[llm] || null : null;
};


export const getSelectedModel = (): CurrentModel | null => {
  // Only access localStorage if we're in the browser
  if (typeof window !== 'undefined') {
    const getCurrentModel = localStorage.getItem("selected-model");
    if (getCurrentModel) {
        const selectedModel = JSON.parse(getCurrentModel) as CurrentModel;
        return selectedModel;
    }
    return null
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
};

export const LLMsOpenAICompatibleEndpoint: Record<LLMProvider, string> = {
  openai: "https://api.openai.com/v1",
  gemini: "https://generativelanguage.googleapis.com/v1beta/openai/",
  openrouter: "https://openrouter.ai/api/v1",
  togetherai: "https://api.together.xyz/v1",
  groq: "https://api.groq.com/openai/v1",
}

export const getLocalSavedTheme = (): SavedTheme | null => {
  const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      return (JSON.parse(savedTheme) as SavedTheme);
    }
    return null
}
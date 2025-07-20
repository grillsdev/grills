import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { CurrentModel, GeneratedCodeContent } from "./types";

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
  groq: "/groq.png",
};

export function completeJSONChunk(chunk: string): GeneratedCodeContent {
  let fixed = chunk.trim();

  // If ends in an unclosed string (e.g., an open quote without closing)
  const quoteCount = (fixed.match(/"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    fixed += '"'; // close last open quote
  }

  // If missing closing curly brace
  if (!fixed.trim().endsWith("}")) {
    fixed += "}"; // close object
  }
  console.log(fixed)
  return JSON.parse(fixed);
}

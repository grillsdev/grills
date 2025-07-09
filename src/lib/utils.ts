import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { CurrentModel } from "./types";

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



export const extractFirstCodeBlock = (content: string, isStreaming: boolean) => {
  // Find where code block starts and ends
  const startTag = '<generated_code>';
  const endTag = '</generated_code>';
  
  const startPos = content.indexOf(startTag);
  const endPos = content.indexOf(endTag);
  
  // Set up our return values
  let beforeCode = '';
  let code: string | null = null;
  let afterCode = '';
  let isLoading = false;
  
  // If no start tag found, everything is "before code"
  if (startPos === -1) {
    beforeCode = content.trim();
    return { pre_code: beforeCode, code, post_code: afterCode, isLoading };
  }
  
  // Get text before the code block
  beforeCode = content.slice(0, startPos).trim();
  
  // Check if we have a complete code block
  if (endPos !== -1 && endPos > startPos) {
    // Complete block - extract the code and text after
    const codeStart = startPos + startTag.length;
    code = content.slice(codeStart, endPos).trim();
    afterCode = content.slice(endPos + endTag.length).trim();
  } else if (isStreaming) {
    // Still streaming - get partial code
    const codeStart = startPos + startTag.length;
    code = content.slice(codeStart).trim();
    isLoading = true;
  } else {
    // Not streaming but incomplete - something went wrong
    isLoading = true;
  }
  
  return {
    pre_code: beforeCode,
    code,
    post_code: afterCode,
    isCodeLoading: isLoading
  };
};

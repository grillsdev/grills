import { $sanboxObj } from "@/store/store";
import { useEffect, useState } from "react";

import { createHighlighter, type Highlighter } from "shiki/bundle/web";
import { useDebouncedCallback } from "use-debounce";

import CodeViewerSidebar from "./code-viewer-sidebar";

const highlighterPromise = createHighlighter({
  langs: [
    "html",
    "css",
    "js",
    "javascript",
    "json",
    "jsx",
    "markdown",
    "md",
    "mdx",
    "plaintext",
    "py",
    "sh",
    "shell",
    "sql",
    "text",
    "ts",
    "tsx",
    "txt",
    "typescript",
    "zsh",
  ],
  themes: ["vitesse-black"],
});

/**
 *
 * the client is creating multiple Highligter instance for eact code update wich is causing the freezing of the client
 * so we have to implement the timeout with bach update ratheer then passing each new chunks coming in the stream
 */
export default function CodeViewer() {
  const [html, setHtml] = useState("");
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const sandbox = $sanboxObj.get();

  // Load highlighter once
  useEffect(() => {
    highlighterPromise.then(setHighlighter);
  }, []);


  // Debounce code highlighting
  const debouncedCode = useDebouncedCallback((codeString) => {
    if (!highlighter) return;
    setHtml(
      highlighter.codeToHtml(codeString, {
        lang: "tsx",
        theme: "vitesse-black",
      })
      );
  }, 50);

  // while streaming make the last element/file the current one
  // if not streaming make the page.tsx code default
  useEffect(() => {
    if (!highlighter) return;
    const codeValues = Object.values(sandbox.code);
    const lastCode = sandbox.isStreaming ? (codeValues[codeValues.length - 1] || "Generating components...") : sandbox.code['src/app/page.tsx']
    debouncedCode(lastCode)
  }, [sandbox, highlighter, debouncedCode]);


  const navigateToCode = async (codeString: string) => {
    if (sandbox.isStreaming) return;
    if (!highlighter) return;
    setHtml(
      highlighter.codeToHtml(codeString, {
        lang: "tsx",
        theme: "vitesse-black",
      })
    );
  };

  if (!highlighter || !html) {
    return (
      <div className="flex items-center justify-center h-[25rem]">
        <div className="block text-green-500 w-7 h-7 border-4 border-dashed animate-spin rounded-full"></div>
      </div>
    );
  }

  return (
    // all the code handeling rendering files is happening in here 
    <CodeViewerSidebar code={sandbox.code} navigateToCode={navigateToCode} isStreaming={sandbox.isStreaming}>
      <div
        className="text-[13px] p-2 bg-black h-full overflow-x-auto max-w-full pb-28"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </CodeViewerSidebar>
  );
}

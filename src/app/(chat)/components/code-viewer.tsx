import { $sanboxObj } from "@/store/sandbox";
import { useEffect, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki/bundle/web";
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
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const sandbox = $sanboxObj.get();

  // Load highlighter once
  useEffect(() => {
    highlighterPromise.then(setHighlighter);
  }, []);
  // Debounce code highlighting
  useEffect(() => {
    if (!highlighter) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const codeValues = Object.values(sandbox.code);
      const lastCode =
      codeValues[codeValues.length - 1] || "Generating components..."

      setHtml(
        highlighter.codeToHtml(lastCode, {
          lang: "tsx",
          theme: "vitesse-black",
        })
      );
    }, 50);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [sandbox.code, highlighter]);


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
    <CodeViewerSidebar code={sandbox.code} navigateToCode={navigateToCode} isStreaming={sandbox.isStreaming}>
      <div
        className="text-[13px] p-2 bg-black h-full overflow-x-auto max-w-full pb-28"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </CodeViewerSidebar>
  );
}

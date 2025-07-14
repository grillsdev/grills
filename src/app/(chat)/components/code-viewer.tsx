import { useEffect, useRef, useState } from "react";
import { createHighlighter, type Highlighter } from "shiki/bundle/web";

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
export default function CodeViewer({ code }: { code: string }) {
  const [html, setHtml] = useState("");
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Load highlighter once
  useEffect(() => {
    highlighterPromise.then(setHighlighter);
  }, []);

  // Debounce code highlighting
  useEffect(() => {
    if (!highlighter) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setHtml(
        highlighter.codeToHtml(code, {
          lang: "tsx",
          theme: "vitesse-black",
        })
      );
    }, 50); // in. millisecond
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code, highlighter]);

  if (!highlighter || !html) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse">Loading code...</div>
      </div>
    );
  }

  return (
    <div className="text-[13px] p-4 bg-black h-full overflow-x-auto max-w-full pb-28" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
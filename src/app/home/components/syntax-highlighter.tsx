import { useEffect, useState } from "react";
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
    "python",
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

interface CodeViewerProps {
  code: string;
  language?: string;
}

export default function CodeViewer({ code, language = "javascript" }: CodeViewerProps) {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  // Load highlighter once
  useEffect(() => {
    highlighterPromise.then(setHighlighter);
  }, []);

  if (!highlighter || !code) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-pulse font-medium text-green-500 text-xs">Loading...</div>
      </div>
    );
  }

  let highlightedHtml;
  try {
    highlightedHtml = highlighter.codeToHtml(code, {
      lang: language,
      theme: "vitesse-black",
      transformers: [{
        pre(node) {
          // Remove background color to make it transparent
          if (node.properties.style) {
            node.properties.style = node.properties.style.toString().replace(/background-color:[^;]+;?/gi, '');
          }
        }
      }]
    });
  } catch (error) {
    console.error("Failed to highlight code:", error);
    // Fallback to plain text if language is not supported
    highlightedHtml = highlighter.codeToHtml(code, {
      lang: "plaintext",
      theme: "vitesse-black",
      transformers: [{
        pre(node) {
          // Remove background color to make it transparent
          if (node.properties.style) {
            node.properties.style = node.properties.style.toString().replace(/background-color:[^;]+;?/gi, '');
          }
        }
      }]
    });
  }

  if (!highlightedHtml) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500 text-xs">Failed to highlight code</div>
      </div>
    );
  }

  return (
    <div 
      className="text-[13px] h-full overflow-x-auto w-full max-w-3xl pb-28"
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
    />
  );
}
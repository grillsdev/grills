import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { IconCode } from "@tabler/icons-react";
import CopyToClipboard from "./copy-to-clipboard";
import type { MessageProps } from "@/lib/types";


const UserCollapsedInput = ({ content }: { content: string }) => {
  const shouldCollapse = content.length > 110;

  if (!shouldCollapse) {
    return (
      <div className="p-3">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="p-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline font-light">
          {content.substring(0, 110)}...
        </AccordionTrigger>
        <AccordionContent>
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

// Custom code component for Markdown
interface CodeBlockProps {
  children: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "";

  return match ? (
    <SyntaxHighlighter
      style={atomDark}
      language={language}
      PreTag="div"
      customStyle={{
        margin: 0,
        borderRadius: "0.5rem",
        fontSize: "1rem",
        letterSpacing: "0.02em",
        lineHeight: "1.5",
        fontFamily: "'Inconsolata', monospace"
      }}
    >
      {children.replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className}>{children}</code>
  );
};


interface MarkdownCodeProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const ChatMessage = ({ id, message, isStreaming }: MessageProps) => {
  return (
    <div className={`px-2 sm:px-4 mb-4`} key={id}>
      <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto flex gap-2 sm:gap-4">
        <div
          className={`h-6 w-6 rounded-[13px] flex items-center justify-center shrink-0 ${
            message.role === "assistant" &&
            "bg-gradient-to-b from-secondary to-accent-foreground"
          }`}
        >
          {message.role === "assistant" && <IconCode className="text-accent" />}
        </div>
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          {message.role === "assistant" ? (
            <div className="leading-relaxed flex flex-col gap-4 group">
              <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-4 leading-7 last:mb-0">{children}</p>
                  ),
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mb-4 mt-6  first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mb-3 mt-5 first:mt-0">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mb-3 mt-4 first:mt-0">
                      {children}
                    </h3>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 mt-2 space-y-2 list-none">
                      <style>{`
                        ol {
                          counter-reset: list-counter;
                        }
                        ol li {
                          counter-increment: list-counter;
                          position: relative;
                          padding-left: 1.75rem;
                        }
                        ol li::before {
                          content: counter(list-counter) ".";
                          position: absolute;
                          left: 0;
                          color: #8fbc8f;
                          font-weight: 600;
                        }
                      `}</style>
                      {children}
                    </ol>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 space-y-2 list-none">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="leading-7 text-gray-200 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-[#8fbc8f] before:font-bold before:text-lg">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-white">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-300">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-[#8fbc8f] pl-4 py-2 mb-4 bg-gray-800/30 italic text-gray-300">
                      {children}
                    </blockquote>
                  ),
                  hr: () => <hr className="my-6 border-t border-gray-600" />,
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-[#8fbc8f] hover:text-[#7aa87a] underline decoration-1 underline-offset-2 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="px-4 py-2 text-left text-[#8fbc8f] font-semibold border-b border-gray-600">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="px-4 py-2 text-gray-200 border-b border-gray-600">
                      {children}
                    </td>
                  ),
                  code: (({
                    className,
                    children,
                  }: MarkdownCodeProps) => {
                    return (
                      <CodeBlock className={className}>
                        {String(children as string).replace(/\n$/, "")}
                      </CodeBlock>
                    );
                  }) as React.ComponentType<unknown>,
                }}
              >
                {message.content}
              </Markdown>
              {isStreaming && (
                <div className="flex items-center gap-1 mt-2">
                  <span className="block w-4 h-5 bg-transparent text-accent-foreground font-mono text-lg animate-pulse">||||</span>
                </div>
              )}
              {!isStreaming && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <CopyToClipboard text={message.content} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-baseline-last group">
              <div className="bg-[#2a2a2a] rounded-[27px] ml-auto max-w-[85%] sm:max-w-[70%] text-sm text-gray-200 shadow-sm">
                <UserCollapsedInput content={message.content} />
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <CopyToClipboard text={message.content} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
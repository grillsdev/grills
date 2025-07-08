import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import CopyToClipboard from "./copy-to-clipboard";
import type { MessageProps } from "@/lib/types";


const UserCollapsedInput = ({ content }: { content: string }) => {
  const shouldCollapse = content.length > 110;

  if (!shouldCollapse) {
    return (
      <div className="px-3 pb-4">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="p-2">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline font-light cursor-pointer">
          {content.substring(0, 110)}...
        </AccordionTrigger>
        <AccordionContent>
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

 // <div className="block h-6 w-6 rounded-[13px] bg-gradient-to-b from-secondary to-accent-foreground" />

export const ChatMessage = ({ id, message, isStreaming }: MessageProps) => {
  return (
    <div className="px-2 sm:px-4" key={id}>
      <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto flex gap-2 sm:gap-4">
        {/* User Message */}
        {message.role === "user" && (
          <div className="flex flex-row items-center gap-1 ">
            <div className="-mt-5 h-5 w-5 rounded-[13px] bg-gradient-to-b from-secondary to-accent-foreground" />
            <div className="flex flex-col gap-4 flex-1 min-w-0">
              <div className="flex flex-col items-baseline group">
                <div className="rounded-[27px] max-w-[85%] sm:max-w-[70%] text-sm text-gray-200 shadow-sm">
                  <UserCollapsedInput content={message.content} />
                </div>
                <div className="w-[50rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200  px-0.5 -mt-5 mb-1">
                  <CopyToClipboard text={message.content} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assistant Message */}
        {message.role === "assistant" && (
          <>
            <span className="px-0.5 font-semibold text-xl italic text-white -mt-1.5 ">
              g
            </span>
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="leading-relaxed text-sm flex flex-col gap-4 group">
                {message.content}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="px-0.5 -mt-2">
                    <CopyToClipboard text={message.content} />
                  </div>
                </div>
              </div>
              {isStreaming&&"Loading..."}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
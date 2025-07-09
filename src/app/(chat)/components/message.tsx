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

import { extractFirstCodeBlock } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { addNewSandbox } from "@/store/sandbox";

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

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-row items-center gap-1 ">
      <div className="-mt-5 h-5 w-5 rounded-[13px] bg-gradient-to-b from-secondary to-accent-foreground" />
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex flex-col items-baseline group">
          <div className="rounded-[27px] max-w-[85%] sm:max-w-[70%] text-sm text-gray-200 shadow-sm">
            <UserCollapsedInput content={content} />
          </div>
          <div className="w-[50rem] opacity-0 group-hover:opacity-100 transition-opacity duration-200  px-3 -mt-3 mb-1">
            <CopyToClipboard text={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

const AssistantMessage = ({
  content,
  isStreaming,
  changeWindowState
}: {
  content: string;
  isStreaming: boolean;
  changeWindowState: (state:boolean) => void
}) => {
  const {isCodeLoading, pre_code, code, post_code} = extractFirstCodeBlock(content, isStreaming)
  return (
    <>
      <span className="px-0.5 font-semibold text-xl italic text-white -mt-1.5 ">
        g
      </span>
      <div className="">
        <div className="text-sm flex flex-col gap-3 group">
          <Markdown remarkPlugins={[remarkGfm]}>{pre_code}</Markdown>
          {code&&(
            <Button
            size="sm" 
            variant={"outline"} 
            disabled={isCodeLoading}
            onClick={()=>{
              addNewSandbox({id: '', code: code})
              changeWindowState(true)
            }}
            className="w-fit py-4 font-light ring-2 ring-accent-foreground/80 my-3">
             {isCodeLoading&&(<Loader2 className="text-green-500 animate-spin"/>)} Component
            </Button>
          )}
          <Markdown remarkPlugins={[remarkGfm]}>{post_code}</Markdown>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="px-0.5 ">
              <CopyToClipboard text={content} />
            </div>
          </div>
        </div>
        {isStreaming && "Loading..."}
      </div>
    </>
  );
};


export const ChatMessage = ({ id, message, isStreaming, changeWindowStateTo }: MessageProps) => {
  return (
    <div className="px-2 sm:px-4" key={id}>
      <div className="max-w-xs sm:max-w-md md:max-w-2xl mx-auto flex gap-2 sm:gap-4">
        {/* User Message */}
        {message.role === "user" && <UserMessage content={message.content} />}

        {/* Assistant Message */}
        {message.role === "assistant" && (
          <AssistantMessage
            content={message.content}
            isStreaming={isStreaming}
            changeWindowState={changeWindowStateTo}
          />
        )}
      </div>
    </div>
  );
};

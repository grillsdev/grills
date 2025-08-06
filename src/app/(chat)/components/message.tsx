import { memo, useEffect} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TerminalLoader } from "@/components/ui/loader";

import type { GeneratedCodeContent, MessageProps } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { $sanboxObj } from "@/store/sandbox";

const UserCollapsedInput = ({ content }: { content: string }) => {
  const shouldCollapse = content.length > 110;

  if (!shouldCollapse) {
    return (
      <div className="px-2.5 text-sm font-medium">
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="px-2.5 max-w-96 -mt-5">
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

const UserMessage = memo(({ content }: { content: string }) => {
  return (
    <div className="flex flex-row">
      <div className="block h-5 w-5 rounded-[13px] bg-gradient-to-b from-secondary to-accent-foreground" />
      <div className="flex flex-col gap-4 flex-1 min-w-0">
          <div className="w-full text-sm text-gray-200 shadow-sm">
            <UserCollapsedInput content={content} />
          </div>
        </div>
    </div>
  )
})


// eslint-disable-next-line react/display-name
const MemoizedMarkdown = memo(({ children }: { children: string }) => (
  <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>
));

import { parse } from 'best-effort-json-parser'


const AssistantMessage = memo(({
  id,
  content,
  isStreaming,
  changeWindowState,
  windowState
}: {
  id: string;
  content: string;
  isStreaming: boolean;
  changeWindowState: (state: boolean) => void;
  windowState:boolean
}) => {
  const sb = $sanboxObj.get();
  const parsedContent:GeneratedCodeContent = parse(content) 
  
  useEffect(() => {
    if (isStreaming) {
      if (sb.id !== id) {
        $sanboxObj.set({ id, code: parsedContent.code || "", isStreaming: true });
      } else {
        $sanboxObj.setKey("code", parsedContent.code || "");
        $sanboxObj.setKey("pkg", parsedContent.pkgs)
      }
    } else if (!isStreaming && sb.id === id && sb.isStreaming === true) {
      $sanboxObj.setKey("isStreaming", false);
      $sanboxObj.setKey("id", '');
    }
  }, [id, isStreaming, parsedContent.code, parsedContent.pkgs, sb.isStreaming, sb.id]);




  return (
    <div className="flex flex-row gap-3 my-7">
      <span className="px-0.5 font-semibold text-xl italic text-white -mt-1.5 ">
        g
      </span>
      <div className="">
        <div className="text-sm flex flex-col gap-1">
          <MemoizedMarkdown>{parsedContent.pre_code}</MemoizedMarkdown>
          {parsedContent.code && (
            <Button
              size="sm"
              variant={"outline"}
              onClick={() => {
                if(!windowState){
                  changeWindowState(true);
                }
                $sanboxObj.set({ id, type:"btn", pkg: parsedContent.pkgs,  code: parsedContent.code, isStreaming: false});
              }}
              className="w-fit py-4 font-light ring ring-accent-foreground my-3 data-[state=open]:ring-rose-400"
            >
              {isStreaming && sb.id === id &&(
                <Loader2 className="text-green-500 animate-spin" />
              )}{" "}
              Component
            </Button>
          )}
          <MemoizedMarkdown>{parsedContent.post_code}</MemoizedMarkdown>

        </div>
        {isStreaming && (
         <TerminalLoader size="sm" className="mt-3"/>
        )}
      </div>
    </div>
  );
});

export const ChatMessage = memo(({
  id,
  message,
  isStreaming,
  changeWindowStateTo,
  windowState
}: MessageProps) => {
  return (
    <div className="px-2 sm:px-4" key={id}>
      <div className="max-w-2xl mx-auto">
        {/* User Message */}
        {message.role === "user" && <UserMessage content={message.content} />}

        {/* Assistant Message */}
        {message.role === "assistant" && (
          <AssistantMessage
            content={message.content}
            isStreaming={isStreaming}
            changeWindowState={changeWindowStateTo}
            windowState={windowState}
            id={message.id}
          />
        )}
      </div>
    </div>
  );
});


UserMessage.displayName = "UserMessage"
AssistantMessage.displayName = "AssistantMessage"
ChatMessage.displayName = "ChatMessage"

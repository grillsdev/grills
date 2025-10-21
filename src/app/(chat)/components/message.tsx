import { memo, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TerminalLoader } from "@/components/ui/loader";

import type { GeneratedCodeContent, MessageProps } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

import { parse } from "best-effort-json-parser";
import { $sanboxObj } from "@/store/store";
import { stripJsonFence } from "@/lib/utils";

const UserCollapsedInput = ({ content }: { content: string }) => {
  const shouldCollapse = content.length > 110;

  if (!shouldCollapse) {
    return <div className="px-2.5 text-sm font-medium">{content}</div>;
  }

  return (
    <Accordion type="single" collapsible className="px-2.5 max-w-96 -mt-5">
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline font-light cursor-pointer">
          {content.substring(0, 110)}...
        </AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const UserMessage = memo(({ content }: { content: string }) => {
  return (
    <div className="flex flex-row selection:bg-base-900 selection:text-secondary">
      <div className="block h-5 w-5 rounded-[13px] bg-gradient-to-b from-secondary to-accent-foreground" />
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="w-full text-sm text-gray-200 shadow-sm">
          <UserCollapsedInput content={content} />
        </div>
      </div>
    </div>
  );
});

const AssistantMessage = memo(
  ({
    id,
    content,
    isStreaming,
    changeWindowState,
    windowState,
  }: {
    id: string;
    content: string;
    isStreaming: boolean;
    changeWindowState: (state: boolean) => void;
    windowState: boolean;
  }) => {
    const sb = $sanboxObj.get();
    // serialization only ```json ``` , most of the time commin g from the claude models
    const sanitized = stripJsonFence(content);
    const parsedContent: GeneratedCodeContent = parse(sanitized);

    useEffect(() => {
      if (isStreaming) {
        if (sb.id !== id) {
          $sanboxObj.set({
            id,
            code: parsedContent.code || {},
            isStreaming: true,
          });
        } else {
          $sanboxObj.setKey("code", parsedContent.code || {});
          $sanboxObj.setKey("pkg", parsedContent.pkgs);
        }
      } else if (!isStreaming && sb.id === id && sb.isStreaming === true) {
        $sanboxObj.setKey("isStreaming", false);
      }
    }, [
      id,
      isStreaming,
      parsedContent.code,
      parsedContent.pkgs,
      sb.isStreaming,
      sb.id,
    ]);

    return (
      <div className="flex flex-row gap-3 my-7">
        <span className="px-0.5 font-semibold text-xl italic text-white -mt-1.5 ">
          g
        </span>
        <div className="selection:bg-base-900 selection:text-secondary">
          <div className="text-sm flex flex-col gap-1">
            <p className="">{parsedContent.pre_code}</p>
            {parsedContent.code && (
              <Button
                size="sm"
                variant={"outline"}
                disabled={isStreaming}
                onClick={() => {
                  if (!windowState) {
                    changeWindowState(true);
                  }
                  $sanboxObj.set({
                    id,
                    type: "btn",
                    pkg: parsedContent.pkgs,
                    code: parsedContent.code,
                    isStreaming: false,
                  });
                }}
                className={`ring ring-accent-foreground/40 my-3 select-none flex flex-row items-center font-medium py-4 transition-all duration-700 ease-in-out ${
                  isStreaming && "py-[22px] rounded-[20px]"
                }`}
                style={{
                  width: "fit-content",
                  transition: "all 0.7s ease-in-out",
                }}
              >
                <span>Component</span>
                <div
                  className={`flex flex-row items-center transition-all duration-700 ease-in-out ${
                    isStreaming
                      ? "opacity-100 translate-x-0 ml-1.5 max-w-xs"
                      : "opacity-0 -translate-x-4 ml-0 max-w-0"
                  } overflow-hidden`}
                >
                  {Object.entries(parsedContent.code).map(
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    ([key, value], index, arr) => (
                      <div key={key}>
                        {index === arr.length - 1 ? (
                          <div className="flex flex-row gap-1.5 items-center whitespace-nowrap">
                            <Loader
                              className="animate-spin text-green-500"
                              width={18}
                            />
                            <p className="font-medium">Generating {key.split('/').pop()}</p>
                          </div>
                        ) : null}
                      </div>
                    )
                  )}
                </div>
              </Button>
            )}

            <div className="">{parsedContent.post_code}</div>
          </div>
          {isStreaming && <TerminalLoader size="sm" className="mt-3" />}
        </div>
      </div>
    );
  }
);

export const ChatMessage = memo(
  ({
    id,
    role,
    messageContent,
    isStreaming,
    changeWindowStateTo,
    windowState,
  }: MessageProps) => {
    return (
      <div className="px-2 sm:px-4" key={id}>
        <div className="max-w-2xl mx-auto">
          {/* User Message */}
          {role === "user" && <UserMessage content={messageContent} />}

          {/* Assistant Message */}
          {role === "assistant" && (
            <AssistantMessage
              content={messageContent}
              isStreaming={isStreaming}
              changeWindowState={changeWindowStateTo}
              windowState={windowState}
              id={id}
            />
          )}
        </div>
      </div>
    );
  }
);

UserMessage.displayName = "UserMessage";
AssistantMessage.displayName = "AssistantMessage";
ChatMessage.displayName = "ChatMessage";

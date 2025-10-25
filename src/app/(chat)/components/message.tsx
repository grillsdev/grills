import { memo, useEffect } from "react";
import Image from "next/image";

import { UIMessage } from "@ai-sdk/react";
import { TerminalLoader } from "@/components/ui/loader";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/app/(chat)/components/ai-elements/reasoning";

import type { GeneratedCodeContent, MessageProps } from "@/lib/types";

import { Button } from "@/components/ui/button";
import { Loader, Undo } from "lucide-react";

import { parse } from "best-effort-json-parser";
import { $sanboxObj } from "@/store/store";
import { stripJsonFence } from "@/lib/utils";

const UserMessage = memo(({ content }: { content: UIMessage }) => {
  return (
    <div className="flex flex-row selection:bg-base-900 selection:text-secondary">
      <div className="block h-5 w-5 rounded-[13px] bg-gradient-to-b from-secondary to-accent-foreground" />
      <div className="flex flex-col gap-4 flex-1 text-gray-300 min-w-0 max-w-md">
        {content.parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <div
                key={index}
                className="w-full text-sm font-medium px-2.5"
              >
                {part.text}
              </div>
            );
          }
          return null;
        })}
        
        {/* Group all file parts together */}
        {content.parts.some(part => part.type === "file") && (
          <div className="flex flex-row flex-wrap gap-2 px-2.5 -mt-3">
            <Undo className="rotate-[230deg] size-4  -mr-1"/>
            {content.parts.map((part, index) => {
              if (part.type === "file") {
                return (
                  <Image
                    key={index}
                    src={part.url}
                    width={14}
                    height={14}
                    alt="User Uploaded image"
                    className="size-5 rounded-[10px] object-cover cursor-pointer ring-1 ring-base-600 mt-1"
                  />
                );
              }
              return null;
            })}
          </div>
        )}
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
  }: MessageProps) => {
    const sb = $sanboxObj.get();

    // Find the first text part that is not reasoning
    const textPart = content.parts.find(part => part.type === "text");
    const reasoningPart = content.parts.find(part => part.type === "reasoning");
    let parsedContent: GeneratedCodeContent = {
      code: {"src/app/page.tsx": ""},
      pkgs: [],
      post_code: "",
      pre_code: ""
    };

    // serialization only ```json ``` , most of the time commin g from the claude models // most of te ```json ``` coming from claude models
    const sanitized = textPart ? stripJsonFence(textPart.text) : "";
    try{
      parsedContent = parse(sanitized)
    }catch{
      // do nothing; just a woek around
    }

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
      <div className="flex flex-row gap-3 my-6">
        <span className="px-0.5 font-semibold text-xl italic text-white -mt-1.5 ">
          g
        </span>
        <div className="selection:bg-base-900 selection:text-secondary">
          <div className="text-sm flex flex-col gap-1">
            {reasoningPart && (
              <Reasoning
                isStreaming={isStreaming}
                defaultOpen={isStreaming?true:false}
                className="flex flex-col items-center mt-1"
              >
                <div className="w-full max-w-2xl">
                  <ReasoningTrigger/>
                  <ReasoningContent>{reasoningPart.text}</ReasoningContent>
                </div>
              </Reasoning>
            )}
            {textPart && (
              <>
                <p className="text-gray-300">{parsedContent.pre_code}</p>
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
                                <p className="font-medium">
                                  Generating {key.split("/").pop()}
                                </p>
                              </div>
                            ) : null}
                          </div>
                        )
                      )}
                    </div>
                  </Button>
                )}

                <div className="text-gray-300">{parsedContent.post_code}</div>
              </>
            )}
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
    content,
    isStreaming,
    changeWindowState,
    windowState,
  }: MessageProps) => {
    return (
      <div className="px-2 sm:px-4" key={id}>
        <div className="max-w-2xl mx-auto">
          {/* User Message */}
          {role === "user" && <UserMessage content={content} />}

          {/* Assistant Message */}
          {role === "assistant" && (
            <AssistantMessage
              id={id}
              content={content} // Pass the entire UIMessage object
              isStreaming={isStreaming}
              changeWindowState={changeWindowState}
              windowState={windowState}
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
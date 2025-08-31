import {
  streamText,
  Output,
  convertToModelMessages,
  createIdGenerator,
  smoothStream,
} from "ai";
import { Redis } from "@upstash/redis";

import { createOpenAI } from "@ai-sdk/openai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createAnthropic } from "@ai-sdk/anthropic";
import { auth } from "@/lib/auth";

import { getDb } from "@/db";
import { eq, and } from "drizzle-orm";

import { aiChat } from "@/db/schema/ai-chat";
import { CompletionRequest } from "@/lib/types";
import { getPromptTxt } from "@/lib/utils";
import { z } from "zod";

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive: true,
});

const codeGenerationSchema = z.object({
  pre_code: z
    .string()
    .describe(
      "What is gonna be generated, some detail, proccess and key point"
    ),
  code: z.string().describe("Code geenration for UI component"),
  post_code: z.string().describe("Detail about code generation"),
  pkgs: z
    .array(z.string())
    .describe("npm pakages to be needed for this UI component"),
});

export async function POST(request: Request) {
  // 1. Early authentication check
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Parse and validate request body
    const body: CompletionRequest = await request.json();
    const { chatId, messages, llm, apiKey, model } = body;

    // 3. Input validation with better error messages
    if (!chatId) {
      return Response.json(
        { error: "Please navigate to a valid chat page" },
        { status: 400 }
      );
    }

    if (!llm || !apiKey || !model) {
      return Response.json(
        { error: "Please provide API key and model configuration" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const sysPrompt = await getPromptTxt();

    let operator = null;
    switch (llm) {
      case "openrouter":
        operator = createOpenRouter({
          apiKey: apiKey,
        });
        break;
      case "anthropic":
        operator = createAnthropic({
          apiKey: apiKey,
        });
        break;
      default:
        operator = createOpenAI({
          apiKey: apiKey,
        });
    }

    const result = streamText({
      model: operator.chat(model),
      messages: convertToModelMessages(messages),
      system: sysPrompt,
      experimental_output: Output.object({
        schema: codeGenerationSchema,
      }),
      experimental_transform: smoothStream({
        delayInMs: 17,
        chunking: "word",
      }),
      onFinish: async ({ text }) => {
        try {
          const generateUserMessageId = createIdGenerator({
            prefix: "usr",
            size: 16,
          });
          const generateMessageId = createIdGenerator({
            prefix: "msg",
            size: 16,
          });

          const lastUserInput = messages[messages.length - 1];
          if (lastUserInput.role !== "user")
            throw new Error("Something went wrong!");

          const userMsgObj = {
            id: generateUserMessageId(),
            role: "user",
            parts: lastUserInput.parts,
            createdAt: new Date(),
          };
          const assistantMessage = {
            id: generateMessageId(),
            role: "assistant" as const,
            parts: [{ type: "text", text: text }],
            createdAt: new Date(),
          };

          const pipeline = redis.pipeline();
          pipeline.lpush(`chat:${chatId}:messages`, JSON.stringify(userMsgObj));
          pipeline.lpush(
            `chat:${chatId}:messages`,
            JSON.stringify(assistantMessage)
          );
          await pipeline.exec();

          await db
            .update(aiChat)
            .set({ updatedAt: new Date() })
            .where(
              and(eq(aiChat.admin, session.user.id), eq(aiChat.chatId, chatId))
            );
        } catch (saveError) {
          console.error("Error saving messages:", saveError);
          // Consider how you want to handle save errors
        }
      },
      onError: (err) => {
        console.error("Stream generation error:", err);
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Completion error:", error);

    // 8. Better error response based on error type
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

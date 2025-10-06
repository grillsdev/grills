import {
  streamText,
  Output,
  convertToModelMessages,
  createIdGenerator,
  smoothStream,
  generateText
} from "ai";
import { Redis } from "@upstash/redis";

import { createOpenAI, OpenAIProvider } from "@ai-sdk/openai";
import { createOpenRouter, type OpenRouterProvider } from "@openrouter/ai-sdk-provider";
import { createAnthropic, AnthropicProvider } from "@ai-sdk/anthropic";
import { auth } from "@/lib/auth";

import { getDb } from "@/db";
import { eq, and } from "drizzle-orm";

import { aiChat } from "@/db/schema/ai-chat";
import { CompletionRequest } from "@/lib/types";
// import { getPromptTxt } from "@/lib/utils";
import { codeGenerationSchema } from "@/lib/types";

import fs from 'node:fs';

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive: true,
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
    const { chatId, messages, llm, apiKey, model, isReasoning} = body;

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
    // const sysPrompt = await getPromptTxt();

    const sysPrompt = await fs.promises.readFile(new URL('../../../lib/prompt.txt', import.meta.url), 'utf-8');

  
    let llmStreamContext
    let titleGenerator: OpenAIProvider | OpenRouterProvider | AnthropicProvider

    switch (llm) {
      case "openrouter": {
        // console.log("running the openrouter")
        const openrouter = createOpenRouter({ apiKey });
        titleGenerator = openrouter;
        const modelOperator = isReasoning
          ? openrouter.chat(model, { reasoning: { enabled: true, effort: "medium" } })
          : openrouter.chat(model);

        llmStreamContext = {
          model: modelOperator,
          messages: convertToModelMessages(messages),
          system: sysPrompt,
          experimental_output: Output.object({ schema: codeGenerationSchema }),
          experimental_transform: smoothStream({ delayInMs: 17, chunking: "word" }),
        };
        break;
      }
      case "anthropic": {
        // console.log("running the anthropic")
        const anthropic = createAnthropic({ apiKey });
        titleGenerator = anthropic;
        const modelOperator = anthropic.chat(model);
        const includeOutputObject = !isReasoning;

        llmStreamContext = {
          model: modelOperator,
          messages: convertToModelMessages(messages),
          system: sysPrompt,
          providerOptions: {
            anthropic: {
              thinking: isReasoning
                ? { type: "enabled", budgetTokens: 12000 }
                : { type: "disabled", budgetTokens: 0 },
            },
          },
          ...(includeOutputObject && { experimental_output: Output.object({ schema: codeGenerationSchema }) }),
          experimental_transform: smoothStream({ delayInMs: 17, chunking: "word" }),
        };
        break;
      }
      default: {
        // console.log("running the openai")
        const openai = createOpenAI({ apiKey });
        titleGenerator = openai;
        const modelOperator = openai.responses(model);

        llmStreamContext = {
          model: modelOperator,
          messages: convertToModelMessages(messages),
          system: sysPrompt,
          providerOptions: {
            openai: isReasoning
              ? { reasoningSummary: "detailed", reasoningEffort: "medium"}
              : { reasoningEffort: "minimal"}
          },
          experimental_output: Output.object({ schema: codeGenerationSchema }),
          experimental_transform: smoothStream({ delayInMs: 17, chunking: "word" }),
        };
        break;
      }
    }

    const result = streamText({
      ...llmStreamContext,
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

          // if its frst user msg thats means the title is not created so create now esle just updte the field wuth updated at
          if (messages.length === 1) {
            const firstUserMsg = messages[0]
            if (firstUserMsg.parts[0].type === "text") {
              const userInput = firstUserMsg.parts[0].text || "Generate the component"
              const { text } = await generateText({
                model: titleGenerator.chat(model),
                prompt: `You just need to create a title based on the user’s input—essentially what they want us to create, generate, or improve in the component. The title should be small. *USER INPUT*: ${userInput}`
              })
              await db
                .update(aiChat)
                .set({ title: text, updatedAt: new Date() })
                .where(
                  and(eq(aiChat.admin, session.user.id), eq(aiChat.chatId, chatId))
                );
            }
          } else {
            await db
              .update(aiChat)
              .set({ updatedAt: new Date() })
              .where(
                and(eq(aiChat.admin, session.user.id), eq(aiChat.chatId, chatId))
              );
          }


          // update the title
        } catch (saveError) {
          console.error("Error saving messages:", saveError);
          // Consider how you want to handle save errors
        }
      },
      onError: (err) => {
        console.error("Stream generation error:", err);
      },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: isReasoning
    });
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

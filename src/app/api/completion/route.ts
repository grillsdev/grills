import {
  streamText,
  Output,
  convertToModelMessages,
  createIdGenerator,
  smoothStream,
  generateText,
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
import { codeGenerationSchema } from "@/lib/types";

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive: true,
});

//iz the chat id doesnot exist create one with title obv fro the user first input 

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

    // const sysPrompt: string = (() => {
    //   let fs: typeof import('fs'), path: typeof import('path');

    //   try {
    //     // Fallback to require for synchronous operation
    //     fs = eval('require')('fs');
    //     path = eval('require')('path');

    //     const promptPath = path.resolve(__dirname, '/Users/aditya/Desktop/utils/grills/development/grills/src/lib/prompt.txt');
    //     const promptText = fs.readFileSync(promptPath, 'utf-8');
    //     return promptText.trim();
    //   } catch (error) {
    //     console.error('Error reading prompt file:', error);
    //     return ''; // Return empty string as fallback
    //   }
    // })();


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

          // if its frst user msg thats means the title is not created so create now esle just updte the field wuth updated at
          if (messages.length === 1) {
            const firstUserMsg = messages[0]
            if (firstUserMsg.parts[0].type === "text") {
              const userInput = firstUserMsg.parts[0].text || "Generate the component"
              const { text } = await generateText({
                model: operator.chat(model),
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

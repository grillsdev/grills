export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server';
import { Redis as UpstashR } from '@upstash/redis';
import Redis from "ioredis"

import { streamText, Output } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@/lib/auth';


import { getDb } from '@/db';
import { eq } from 'drizzle-orm';

import { aiChat } from '@/db/schema/ai-chat';
import { CompletionRequest } from '@/lib/types';


// Initialize Redis
const redis = new UpstashR({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive:true
});

import { z } from "zod"
import { getPromptTxt, LLMsOpenAICompatibleEndpoint } from '@/lib/utils';

const codeGenerationSchema = z.object({
  pre_code: z.string().describe("What is gonna be generated, some detail, proccess and key point"),
  code: z.string().describe("Code geenration for UI component"),
  post_code: z.string().describe("Detail about code generation"),
  pkgs: z.array(z.string()).describe("npm pakages to be needed for this UI component")
})

export async function POST(request: Request) {
  const session = await auth.api.getSession({
        headers: request.headers,
  });
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // Parse request body
    const body: CompletionRequest = await request.json();
    const { chatId, messages, llm, apiKey, model } = body;
    const db = await getDb()
    const generatedMsgId = `msg-${uuidv4()}`;

    if(!chatId) return Response.json(
      "Please navigate to Valid Chat Page" , 
      { status: 500 }
    );
    
    if(!llm || !apiKey || !model){
      return Response.json("Please add the API Key of that particular model", {status: 500})
    }

    const operator = createOpenAI({ apiKey: apiKey, baseURL: LLMsOpenAICompatibleEndpoint[llm]});

    const lastMessage = messages[messages.length-1]
    if(lastMessage.role !== "user") return Response.json("Invalid message array", {status: 500})
    
    // Create a user input stream to all other user in oder stream to all other user
    const userInputStreamObj = {
      role: "user",
      content: lastMessage.content,
      id: lastMessage.id,
      createdAt: lastMessage.createdAt,
      type: "user_input",
      chatId: chatId
    } as const;

    // Stream the user input to all other joined users
    await redis.publish(`chat:${chatId}`, JSON.stringify(userInputStreamObj));
    // save the user input in the reddis
    await redis.lpush(`chat:${chatId}:messages`, JSON.stringify({
      role: "user",
      content: lastMessage.content,
      id: lastMessage.id,
      createdAt: lastMessage.createdAt,
      chatId: chatId
    }));

    const sysPrompt = await getPromptTxt()

    let wholeSentence = "";
    const result = streamText({
      model: operator.chat(model),
      messages: messages,
      system: sysPrompt,
      experimental_output: Output.object({
        schema: codeGenerationSchema
      }),
      onChunk: ({ chunk }) => {
        if (chunk.type === "text-delta") {
          wholeSentence += chunk.textDelta;
        }
        redis.publish(`chat:${chatId}`, JSON.stringify({
          role: "assistant",
          id: generatedMsgId,
          content: wholeSentence,
          createdAt: new Date(),
          type: "chat_streaming",
        }))
      },
      onFinish: async ({ text }) => {
        // Save generated content to Redis
        await redis.lpush(
          `chat:${chatId}:messages`,
          JSON.stringify({
            role: "assistant",
            id: generatedMsgId,
            content: text,
            createdAt: new Date(),
          })
        );

        // Publish completion event
        await redis.publish(
          `chat:${chatId}`,
          JSON.stringify({
            role: "assistant",
            id: generatedMsgId,
            content: wholeSentence,
            createdAt: new Date(),
            type: "chat_completed",
            chatId: chatId,
          })
        );

        // update the last update 
        await db.update(aiChat).set({updatedAt: new Date()}).where(eq(aiChat.user, session.user.id))
      },
      onError: (err) => {
        console.log("Error", err);
      }
    });

   return result.toDataStreamResponse()
  } catch (error) {
    console.error("Completion error:", error);
    return Response.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

//connect to the stream/perticular ai room in order to get liveupdate
export async function GET(request: NextRequest) {
  const searchP = request.nextUrl.searchParams;
  const chatId = searchP.get('chatId');
  const setKey = `chat:${chatId}`;

  if (!chatId) {
    return new Response('Chat ID is required', { status: 400 });
  }

  try {
    const redisSubscriber = new Redis(process.env.UPSTASH_REDIS_URL!);
    const encoder = new TextEncoder();
    let isStreamActive = true;

    const completionStream = new ReadableStream({
      start(controller) {
        redisSubscriber.subscribe(setKey, (err) => {
          if (err) {
            console.error('Redis subscribe error:', err);
            controller.error(err);
            return;
          }
          console.log(`Subscribed to ${setKey}`);
        });

        // Listen for new Completion from upstash Redis
        redisSubscriber.on('message', (channel, message) => {
          if (!isStreamActive) return;
          
          try {
            if (channel === setKey) {
              controller.enqueue(encoder.encode(`data: ${message}\n\n`));
            }
          } catch (error) {
            console.error('Error in message handler:', error);
          }
        });

        redisSubscriber.on('error', (error) => {
          console.error('Redis error:', error);
          if (isStreamActive) {
            controller.error(error);
          }
        });
      },
      
      cancel() {
        isStreamActive = false;
        try {
          redisSubscriber.unsubscribe(setKey);
          redisSubscriber.quit();
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    });

    return new Response(completionStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Content-Encoding': 'none',
    },
    })
   
  } catch (error) {
    console.error('SSE error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// import { streamText, generateText } from 'ai';
import { streamText } from 'ai';

import { createOpenAI } from '@ai-sdk/openai';
// import { createGoogleGenerativeAI } from '@ai-sdk/google';
// import { createOpenRouter } from '@ai-sdk/openrouter';
import { v4 as uuidv4 } from 'uuid';
import { Redis as UpstashR } from '@upstash/redis';
// import { db } from '@/lib/db'; // Adjust path as needed
// import { message } from '@/lib/schema'; // Adjust path as needed
// import { eq } from 'drizzle-orm';

import { type Message } from 'ai';
import { NextRequest } from 'next/server';


// Initialize Redis
export const redis = new UpstashR({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive:true
});

// Type definitions
type LLMProvider = "openai" | "gemini" | "openrouter" | "groq";


interface CompletionRequest {
  prompt: string;
  chatId: string;
  messages: Message[];
  llm: LLMProvider;
  apiKey: string;
  model: string;
}


export async function POST(request: Request) {
  try {
    // Parse request body
    const body: CompletionRequest = await request.json();
    const { prompt, chatId, messages, llm, apiKey, model } = body;


  console.log("~~~~~~~~CHATID Completion~~~~~~~~~~~~~~~`", chatId)
    
    
    // Get user ID from authentication
    // const userId = await getUserId(request);
    console.log(llm, apiKey, model);

    // Validation
    // if (!chatId || !userId) {
    //   return NextResponse.json(
    //     { error: "Chat Id or User Id required" }, 
    //     { status: 407 }
    //   );
    // }
    
    // if (!apiKey) {
    //   return NextResponse.json(
    //     { message: "Invalid key" }, 
    //     { status: 400 }
    //   );
    // }

    // if (!prompt) {
    //   return NextResponse.json(
    //     { error: "Prompt is required" }, 
    //     { status: 400 }
    //   );
    // }

    // Initialize AI provider based on LLM type
    // let operator: any;

    // switch (llm) {
    //   case "openai":
    //     operator = createOpenAI({
    //       apiKey: apiKey
    //     });
    //     break;
    //   case "gemini":
    //     operator = createGoogleGenerativeAI({
    //       apiKey: apiKey
    //     });
    //     break;
    //   case "openrouter":
    //     operator = createOpenRouter({
    //       apiKey: apiKey,
    //     });
    //     break;
    //   case "groq":
    //     operator = createOpenAI({
    //       apiKey: apiKey,
    //       baseURL: "https://api.groq.com/openai/v1",
    //     });
    //     break;
    //   default:
    //     return NextResponse.json(
    //       { message: "Invalid llm" }, 
    //       { status: 400 }
    //     );
    // }

    // Generate IDs for tracking
    

    const operator = createOpenAI({
      apiKey: apiKey
    });
    const generatedUserInputId = `usr-${uuidv4()}`;
    const generatedMsgId = `msg-${uuidv4()}`;
    
    // Create user input object
    const userInputObj = {
      role: "user",
      content: prompt,
      id: generatedUserInputId,
      createdAt: new Date(),
      type: "user_input",
      chatId: chatId
    } as const;

    const msgLen = messages ? messages.length : 0;

    // Build message array
    // if 0 messaegs create a new msg iwht user prompt only otherwise append to old msg[] obj
    let newMssgArray:Message[]
    if (msgLen > 0) {
      newMssgArray = [...messages, userInputObj];
    } else {
      newMssgArray = [userInputObj];
    }

    let wholeSentence = "";

    // Publish user input to Redis
    await redis.publish(`chat:${chatId}`, JSON.stringify(userInputObj));
    await redis.lpush(`chat:${chatId}:messages`, JSON.stringify(userInputObj));

    // Create AI stream
    const result = streamText({
      model: operator.chat("gpt-4o-mini-2024-07-18"),
      messages: newMssgArray,
      system: `you are a ai assistant name Gass you are 10 days old and you will only answer what is asked by the user nothing more nothing less.`,
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
        }));
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

        // Save message reference to database
        // const newMsg = {
        //   id: chatId,
        //   userId: userId,
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // };
        
        // await db
        //   .insert(message)
        //   .values(newMsg)
        //   .onConflictDoUpdate({
        //     target: message.id,
        //     set: {
        //       updatedAt: new Date(),
        //     },
        //   });

        // Generate title for new conversations
        // if (msgLen === 0) {
        //   const { text: generatedTitle } = await generateText({
        //     model: operator.chat(model),
        //     prompt: `Generate a title under 56 characters for the following content. Prioritize Content1: ${text}. If the title derived from Content1 is not descriptive or meaningful, then use Context2: ${prompt} for title generation instead. Never use both. NOTE: never use quote the tile should simply be text witoout the quote:`,
        //   });
          
        //   await db
        //     .update(message)
        //     .set({ title: generatedTitle })
        //     .where(eq(message.id, chatId));
        // }

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

import Redis from "ioredis"

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
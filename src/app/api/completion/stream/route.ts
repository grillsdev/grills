// app/api/ai/completion/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { streamText, generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenRouter } from '@ai-sdk/openrouter';
import { v4 as uuidv4 } from 'uuid';
import { Redis } from '@upstash/redis';
import { db } from '@/lib/db'; // Adjust path as needed
import { message } from '@/lib/schema'; // Adjust path as needed
import { eq } from 'drizzle-orm';

import { type Message: AIMessage } from 'ai';

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Type definitions
type LLMProvider = "openai" | "gemini" | "openrouter" | "groq";

interface CompletionRequest {
  prompt: string;
  chatId: string;
  messages?: AIMessage[];
  llm: LLMProvider;
  apiKey: string;
  model: string;
}

// Helper function to get user ID (implement based on your auth system)
async function getUserId(request: NextRequest): Promise<string | null> {
  // Implement your authentication logic here
  // This could be from JWT token, session, etc.
  // For example:
  // const token = request.headers.get('authorization');
  // const user = await verifyToken(token);
  // return user?.id || null;
  
  // Placeholder - replace with your actual auth logic
  return "user-123"; // Replace with actual user ID extraction
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CompletionRequest = await request.json();
    const { prompt, chatId, messages, llm, apiKey, model } = body;
    
    console.log("LLM, MODEL", llm, model);
    
    // Get user ID from authentication
    const userId = await getUserId(request);
    console.log(llm, apiKey, model);

    // Validation
    if (!chatId || !userId) {
      return NextResponse.json(
        { error: "Chat Id or User Id required" }, 
        { status: 407 }
      );
    }
    
    if (!apiKey) {
      return NextResponse.json(
        { message: "Invalid key" }, 
        { status: 400 }
      );
    }

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" }, 
        { status: 400 }
      );
    }

    // Initialize AI provider based on LLM type
    let operator: any;

    switch (llm) {
      case "openai":
        operator = createOpenAI({
          apiKey: apiKey
        });
        break;
      case "gemini":
        operator = createGoogleGenerativeAI({
          apiKey: apiKey
        });
        break;
      case "openrouter":
        operator = createOpenRouter({
          apiKey: apiKey,
        });
        break;
      case "groq":
        operator = createOpenAI({
          apiKey: apiKey,
          baseURL: "https://api.groq.com/openai/v1",
        });
        break;
      default:
        return NextResponse.json(
          { message: "Invalid llm" }, 
          { status: 400 }
        );
    }

    // Generate IDs for tracking
    const generatedUserInputId = `usr-${uuidv4()}`;
    const generatedMsgId = `msg-${uuidv4()}`;
    
    // Create user input object
    const userInputObj = {
      role: "user",
      content: prompt,
      id: generatedUserInputId,
      timestamp: new Date(),
      type: "user_input",
    };

    const msgLen = messages ? messages.length : 0;

    // Build message array
    let newMssgArray;
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
      model: operator.chat(model),
      messages: newMssgArray,
      system: `you are a ai assistant name Gass you are 10 days old and you will only answer what is asked by the user nothing more nothing less.`,
      onChunk: async ({ chunk }) => {
        if (chunk.type === "text-delta") {
          wholeSentence += chunk.textDelta;
        }
        await redis.publish(`chat:${chatId}`, JSON.stringify({
          role: "assistant",
          id: generatedMsgId,
          content: wholeSentence,
          timestamp: new Date(),
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
            timestamp: Date.now(),
          })
        );

        // Save message reference to database
        const newMsg = {
          id: chatId,
          userId: userId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        await db
          .insert(message)
          .values(newMsg)
          .onConflictDoUpdate({
            target: message.id,
            set: {
              updatedAt: new Date(),
            },
          });

        // Generate title for new conversations
        if (msgLen === 0) {
          const { text: generatedTitle } = await generateText({
            model: operator.chat(model),
            prompt: `Generate a title under 56 characters for the following content. Prioritize Content1: ${text}. If the title derived from Content1 is not descriptive or meaningful, then use Context2: ${prompt} for title generation instead. Never use both. NOTE: never use quote the tile should simply be text witoout the quote:`,
          });
          
          await db
            .update(message)
            .set({ title: generatedTitle })
            .where(eq(message.id, chatId));
        }

        // Publish completion event
        await redis.publish(
          `chat:${chatId}`,
          JSON.stringify({
            role: "assistant",
            id: generatedMsgId,
            content: wholeSentence,
            timestamp: new Date().toISOString(),
            type: "chat_completed",
            chatId: chatId,
          })
        );
      },
      onError: (err) => {
        console.log("Error", err);
      }
    });

    // Return streaming response with proper headers
    return new Response(result.toDataStream(), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
        'Content-Encoding': 'none',
      },
    });

  } catch (error) {
    console.error("Completion error:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
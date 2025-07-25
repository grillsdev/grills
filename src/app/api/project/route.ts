import { authMiddleware } from "@/lib/auth-middleware"
import { CreateChatRequest } from "@/lib/types";
import { v4 as uuid } from "uuid";

import { aiChat } from "@/db/schema/ai-chat";
import { getDb } from "@/db";
import { auth } from "@/lib/auth";
import Redis from "ioredis";

// create a project -> start a chat
export const POST = authMiddleware(async (request: Request, session) => {
  try {
    const body: CreateChatRequest = await request.json();
    const { title } = body;

    if (!title?.trim()) {
      return Response.json(
        { error: 'Chat title is required' },
        { status: 400 }
      );
    }

    // Generate unique chat ID
    const db = await getDb()
    const chatId = uuid() //act -> ai_chat

    // Prepare chat data for insertion
    const newAIChat: typeof aiChat.$inferInsert = {
      chatId,
      title: title.trim(),
      admin: session.userId,
      user: session.userId,
      type: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert new chat into database
    const result = await db
      .insert(aiChat)
      .values(newAIChat)
      .returning({ insertedId: aiChat.chatId });


    if (!result.length) {
      throw new Error('Failed to create chat');
    }

    // Return success response
    return Response.json({
      chatId: result[0].insertedId,
    }, { status: 201 });

  } catch (error) {
    console.error('Chat creation error:', error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return Response.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return Response.json(
      { error: 'Failed to create chat' },
      { status: 500 }
    );
  }
});


// get the join notifictions to the admin
// Move this to notification -> /api/project/[id]/notification
export async function GET(request: Request) {
  try{
     const session = await auth.api.getSession({
     headers: request.headers,
    });

    if (!session) {
        return Response.json(
        { error: "Unauthorized" }, 
        { status: 401 }
        );
    }
    const adminId = session.user.id
    const setKey = `join:request:${adminId}`;

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
   
  }catch(error){
    console.error('SSE error:', error);
    return new Response('Internal server error', { status: 500 });
  }

}
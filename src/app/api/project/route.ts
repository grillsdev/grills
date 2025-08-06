import { authMiddleware } from "@/lib/auth-middleware"
import { CreateChatRequest } from "@/lib/types";
import { v4 as uuid } from "uuid";

import { aiChat } from "@/db/schema/ai-chat";
import { getDb } from "@/db";

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

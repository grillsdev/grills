/**
 * Get the Chat history
 */


import { NextRequest } from "next/server";
import { Redis } from '@upstash/redis';
import { auth } from "@/lib/auth";
import { getDb } from "@/db";
import { aiChat } from "@/db/schema/ai-chat";
import { eq, and } from "drizzle-orm";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive:true
});

export async function GET(request:NextRequest){
  const session = await auth.api.getSession({
      headers: request.headers,
    });
  
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  try{
    const searchParam =  request.nextUrl.searchParams;
    const chatId = searchParam.get("chatId")
    if(!chatId) return Response.json(
      "Please navigate to Valid Chat Page" , 
      { status: 500 }
    );
    const db = await getDb();
    const chatAdmin = await db.select().from(aiChat).where(and(eq(aiChat.chatId, chatId), eq(aiChat.admin, session.user.id)))
    if(!chatAdmin[0]) return Response.json({error: "Not found"}, {status: 404})
    const setKey = `chat:${chatId}:messages`
    const getUserChats = await redis.lrange(setKey, 0, -1)
    // got newst to oldest message but we want olders to newest for chat ui
    const messages = getUserChats.reverse()
    return Response.json({"messages": messages}, {status:200})
  }
  catch{
    return Response.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}
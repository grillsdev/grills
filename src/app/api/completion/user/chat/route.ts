/**
 * Get the Chat history
 */


import { NextRequest } from "next/server";
import { Redis as UpstashR } from '@upstash/redis';

const redis = new UpstashR({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive:true
});

export async function GET(request:NextRequest){
  try{
    const searchParam =  request.nextUrl.searchParams;
    const chatId = searchParam.get("chatId")

    if(!chatId) return Response.json(
      "Please navigate to Valid Chat Page" , 
      { status: 500 }
    );

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
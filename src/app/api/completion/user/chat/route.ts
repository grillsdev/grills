import { NextRequest } from "next/server";
import { redis } from "../../route";


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
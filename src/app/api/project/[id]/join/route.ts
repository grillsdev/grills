// export const runtime = 'nodejs'
// export const dynamic = 'force-dynamic'

import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { aiChat } from "@/db/schema/ai-chat";
import { auth } from "@/lib/auth";
import { Redis as UpstashR } from "@upstash/redis";
import { ProjectAccessRequest } from "@/lib/types";

import { v4 as uuid } from "uuid";
import { redirect } from "next/navigation";

export const redis = new UpstashR({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  keepAlive: true,
});

//Project detail
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    const result = await db
      .select()
      .from(aiChat)
      .where(and(eq(aiChat.chatId, projectId), eq(aiChat.type, "admin")));

    if (!result[0]) {
      return Response.json({ error: "404 Not found" }, { status: 404 });
    }

    return Response.json(result[0], { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// subscribe -> join/adminId/chtid -> publish the item
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  /**
   * if the requested user had already join the project redirect it to the chatpage
   */
  const isAlreadeayJoined = await db
    .select()
    .from(aiChat)
    .where(and(eq(aiChat.chatId, projectId), eq(aiChat.user, session.user.id)));
  if(isAlreadeayJoined[0]) return redirect(`/c/${projectId}`)

  // check weather umber of users/invitaion who jontd the chat. is crossed or not if crosed return error that this chat already crossed the certain limit
  try {
    const result = await db
      .select()
      .from(aiChat)
      .where(and(eq(aiChat.chatId, projectId), eq(aiChat.type, "admin")));

    if (!result[0]) {
      return Response.json({ error: "404 Not found" }, { status: 404 });
    }

    const adminId = result[0].admin;
    const projectTitle = result[0].title;
    const userId = session.user.id;
    const userName = session.user.name;
    const setKey = `join:request:${adminId}`;

    const requestObj: ProjectAccessRequest = {
      id: uuid(),
      userRequested: userId,
      userRequestedName: userName,
      requestedProject: projectId,
      requestedProjectTitle: projectTitle || "Project title xyz",
      admin: adminId,
      type: "request_access",
    };

    await redis.publish(setKey, JSON.stringify(requestObj));

    return Response.json({ status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

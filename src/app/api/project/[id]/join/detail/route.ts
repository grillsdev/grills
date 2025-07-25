// for short polling weather i joined the chat/ptoject or not and return the data
import { auth } from "@/lib/auth";
import { getDb } from "@/db";
import { eq, and } from "drizzle-orm";
import { aiChat } from "@/db/schema/ai-chat";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { id: projectId } = await params;

    const db = await getDb()
    const result = await db
      .select()
      .from(aiChat)
      .where(
        and(eq(aiChat.chatId, projectId), eq(aiChat.user, session.user.id))
      );

    if (!result[0]) {
      return new Response(null, { status: 204 });
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

import { eq, desc} from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getDb } from "@/db";
import { aiChat } from "@/db/schema/ai-chat";

// user Saved Project
export async function GET(request: Request) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    try{
      const db = await getDb()
        const userId = session.user.id
        const result = await db.select().from(aiChat).where(eq(aiChat.user, userId)).orderBy(desc(aiChat.createdAt)).limit(20)
        return Response.json({"projects": result}, {status:200})
    }catch{
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
    }
}

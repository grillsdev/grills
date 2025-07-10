import { eq, desc} from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { aiChat } from "@/db/schema/ai-chat";

export async function GET(request: Request) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    try{
        const userId = session.user.id
        const result = await db.select().from(aiChat).where(eq(aiChat.user, userId)).orderBy(desc(aiChat.updatedAt)).limit(20)
        return Response.json({"projects": result}, {status:200})
    }catch{
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
    }
}
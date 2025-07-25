import { authMiddleware } from "@/lib/auth-middleware";
import { eq, and } from "drizzle-orm";
import { getDb } from "@/db";
import { aiChat } from "@/db/schema/ai-chat";


// weather the requested user is admin or not of this current chat
export const GET = authMiddleware(async (request: Request, session) => {
  try {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/').filter(segment => segment !== '');
    const projectId = pathSegments[pathSegments.length - 1];
    const userId = session.userId
    
    // Validate project ID exists and is not empty
    if (!projectId || projectId.trim() === '') {
      return Response.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
    
    // Additional validation: check if the last segment is actually a project ID
    // and not just "project" (in case URL is /api/project instead of /api/project/123)
    if (projectId === 'project') {
      return Response.json(
        { error: 'Project ID is required' },
        { status: 400 }
      );
    }
  

    const db = await getDb()
    const result = await db.select().from(aiChat).where(and(eq(aiChat.admin, userId), eq(aiChat.user, userId), eq(aiChat.chatId, projectId), eq(aiChat.type, "admin")))
    
    // return Response.json(result[0], {status: 200});
    if(!result[0]){
        return Response.json(
            {error: '404 Not found'},
            {status: 404}
        )
    }
    
    return Response.json(result[0], {status: 200})
    
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
});
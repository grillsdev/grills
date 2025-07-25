
import { getDb} from "@/db";
import { auth } from "@/lib/auth";

import { aiChat } from "@/db/schema/ai-chat";
import { ProjectAccessRequest } from "@/lib/types";


// Accept the request of the chat access
export async function POST(request: Request) {
    try{
    const body: ProjectAccessRequest = await request.json();
    const session = await auth.api.getSession({
              headers: request.headers,
        });
        
    if (!session) {
        return Response.json(
        { error: "Unauthorized" }, 
        { status: 401 }
        );
    }


    // may be we should add the verification get the select the aiChat table varifiy all teh detail the. insert it 
    // admin alsso shpuld be same as session.userid/user.id if not return error but now we are assuming they are same
    const {admin, userRequested, requestedProjectTitle, requestedProject} = body

    const newAIChat: typeof aiChat.$inferInsert = {
      chatId: requestedProject,
      title: requestedProjectTitle,
      admin: admin,
      user: userRequested,
      type: "joined",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert new chat into database
    const db = await getDb()
    await db
      .insert(aiChat)
      .values(newAIChat)
    return Response.json({status:200})

    }catch(error){
    console.error('SSE error:', error);
    return new Response('Internal server error', { status: 500 });
    }
}


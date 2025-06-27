import { auth } from "@/lib/auth";
import type { Session } from "better-auth";

export function authMiddleware(handler: (request: Request, session: Session) => Promise<Response>) {
  return async function(request: Request) {
    try {
      // Check authentication
      const session = await auth.api.getSession({
        headers: request.headers,
      });

      // If no session, return 401 Unauthorized
      if (!session) {
        return Response.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }

      // Call the original handler with the session
      return await handler(request, session.session);
    } catch (error) {
      console.error("Error while authentication", error);
      return Response.json(
        { error: "Internal server error" }, 
        { status: 500 }
      );
    }
  };
}
import { eq, desc} from "drizzle-orm";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { authMiddleware } from "@/lib/auth-middleware";

import { themeVerificationPrompt } from "@/lib/prompt-shadcn";
import { themeSchema } from "@/lib/types";
import { db } from "@/db";
import { userTheme } from "@/db/schema/theme";

const operator = createOpenAI({
  apiKey: "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"
});

export const POST = authMiddleware(async (request: Request, session) => {
  const context = await request.json();
  const userId = session.userId

  const { object } = await generateObject({
    model: operator.chat("gpt-4o-mini-2024-07-18"),
    schema: themeSchema,
    system: themeVerificationPrompt,
    prompt: `Validate this: ${JSON.stringify(context)}`,
  });
  if(object.isValid){
    await db.insert(userTheme).values({name: object.name, color: object.color, data: object.data, createdAt: new Date(), user: userId})
  }
  return Response.json(object, { status: 200 });
});


export const GET = authMiddleware(async (request: Request, session) => {
    const userId = session.userId
    const savedThemes = await db.select({
      id:userTheme.id,
      name:userTheme.name,
      color:userTheme.color,
      data:userTheme.data,
      createdAt:userTheme.createdAt
    }).from(userTheme).where(eq(userTheme.user, userId)).orderBy(desc(userTheme.createdAt))
    return Response.json(savedThemes, {status:200})
})
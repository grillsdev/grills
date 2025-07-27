import { eq, desc} from "drizzle-orm";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { authMiddleware } from "@/lib/auth-middleware";

import { themeVerificationPrompt } from "@/lib/prompt-shadcn";
import { CreateThemeContext, LLMProvider, themeSchema } from "@/lib/types";
import { getDb } from "@/db";
import { userTheme } from "@/db/schema/theme";
import { LLMsOpenAICompatibleEndpoint } from "@/lib/utils";


export const POST = authMiddleware(async (request: Request, session) => {
  const context: CreateThemeContext = await request.json();
  const userId = session.userId
  const db = await getDb()
console.log("~~~~Context~~~~~~", context)
  const operator = createOpenAI({
    apiKey: context.apiKey,
    baseURL: LLMsOpenAICompatibleEndpoint[context.llm as LLMProvider]
  });
  const { object } = await generateObject({
    model: operator.chat(context.model),
    schema: themeSchema,
    system: themeVerificationPrompt,
    prompt: `Validate this: ${JSON.stringify(context.content)}`,
  });
  if(object.isValid){
    await db.insert(userTheme).values({name: object.name, color: object.color, data: object.data, createdAt: new Date(), user: userId})
  }
  return Response.json(object, { status: 200 });
});


export const GET = authMiddleware(async (request: Request, session) => {
    const userId = session.userId
    const db = await getDb()
    const savedThemes = await db.select({
      id:userTheme.id,
      name:userTheme.name,
      color:userTheme.color,
      data:userTheme.data,
      createdAt:userTheme.createdAt
    }).from(userTheme).where(eq(userTheme.user, userId)).orderBy(desc(userTheme.createdAt))
    return Response.json(savedThemes, {status:200})
})
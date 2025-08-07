import { auth } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";

import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

import { themeVerificationPrompt } from "@/lib/prompt";
import { CreateThemeContext, LLMProvider, themeSchema } from "@/lib/types";
import { getDb } from "@/db";
import { userTheme } from "@/db/schema/theme";
import { LLMsOpenAICompatibleEndpoint } from "@/lib/utils";

/**
 *
 * add the switch case for all other llms
 */
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const context: CreateThemeContext = await request.json();
  const userId = session.user.id;
  const db = await getDb();
  const operator = createOpenAI({
    apiKey: context.apiKey,
    baseURL: LLMsOpenAICompatibleEndpoint[context.llm as LLMProvider],
  });
  try {
    let model;
    switch (context.llm) {
      case "openrouter":
        model = "x-ai/grok-3-mini";
        break;
      default:
        model = "o4-mini";
    }
    const { object } = await generateObject({
      model: operator.chat(model),
      schema: themeSchema,
      system: themeVerificationPrompt,
      prompt: `Validate this: ${context.content}`,
    });
    console.log(object);
    if (object.isValid) {
      await db.insert(userTheme).values({
        name: object.name,
        color: object.color,
        data: object.data,
        createdAt: new Date(),
        user: userId,
      });
      return Response.json(object, { status: 200 });
    }
    return Response.json("Not enough credit left in user's API", {
      status: 400,
    });
  } catch (ee) {
    console.log("!!!EERR!!", ee);
    return Response.json("Not enough credit left in user's API", {
      status: 500,
    });
  }
}

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;
  const db = await getDb();
  const savedThemes = await db
    .select({
      id: userTheme.id,
      name: userTheme.name,
      color: userTheme.color,
      data: userTheme.data,
      createdAt: userTheme.createdAt,
    })
    .from(userTheme)
    .where(eq(userTheme.user, userId))
    .orderBy(desc(userTheme.createdAt));
  return Response.json(savedThemes, { status: 200 });
}

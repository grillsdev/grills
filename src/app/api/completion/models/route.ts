import { db } from '@/db/index';
import { llm, model } from '@/db/schema/model';

import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { authMiddleware } from '@/lib/auth-middleware';


export const GET = authMiddleware(async (request: Request, session) => {
  console.log("Authenticated user in the model route:", session.userId);
  
  const llms = await db.select().from(llm);
  const models = await db.select().from(model);
  
  const result = llms.map(l => ({
    ...l,
    models: models.filter(m => m.llmId === l.id)
  }));
  
  return Response.json(result);
});


// verification for each model  
export async function POST(req:Response) {
    const body = await req.json()
    const { prompt: apiKey, llm } = body as { llm: string; prompt: string }
    try{
      let model;
      let baseUrl;
      switch(llm){
        case "gemini":
          model = "gemini-2.0-flash"
          baseUrl = "https://generativelanguage.googleapis.com/v1beta/openai/"
          break
        default:
          model = "gpt-3.5-turbo"
          baseUrl = "https://api.openai.com/v1/"
      }
      const openai = createOpenAI({
      apiKey:apiKey,
      baseURL: baseUrl
     })
    const {text} = await generateText({
      model: openai(model),
      prompt: "just return me with what is the 1+1 in words thats is nothing more or nothing less "
    })
    return Response.json({text})
    }catch(error){
      console.log(error)
      return Response.json({error: "Invalid api key"}, {status: 500})
    }

}
import { getDb } from '@/db/index';
import { llm, model } from '@/db/schema/model';

import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { authMiddleware } from '@/lib/auth-middleware';

import { LLMProvider } from '@/lib/types';
import { LLMsOpenAICompatibleEndpoint } from '@/lib/utils';


export const GET = authMiddleware(async () => {
  const db = await getDb()
  
  const llms = await db.select().from(llm);
  const models = await db.select().from(model);
  
  const result = llms.map(l => ({
    ...l,
    models: models.filter(m => m.llmId === l.id)
  }));
  
  return Response.json(result);
});


// verification for each LLM
export const POST = authMiddleware(async (request:Request)=>{
    const body = await request.json()
    const { prompt: apiKey, llm } = body as { llm: LLMProvider; prompt: string }
    console.log(llm)
    try{
      let model;
      switch(llm){
        case "gemini":
          model = "gemini-2.0-flash"
          break
        case "openrouter":
          model = "mistralai/ministral-3b";
          break
        case "togetherai":
          model = "Qwen/Qwen3-235B-A22B-Instruct-2507-tput";
          break
        case "groq":
          model = "qwen/qwen3-32b";
          break
        default:
          model = "gpt-3.5-turbo"
      }
      const openai = createOpenAI({
      apiKey:apiKey,
      baseURL: LLMsOpenAICompatibleEndpoint[llm]
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

})
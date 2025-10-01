import { auth } from '@/lib/auth';

import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

import { LLMProvider } from '@/lib/types';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { createAnthropic } from '@ai-sdk/anthropic';


// verify the api token before sacing that 
export async function POST(request: Request) {
  const session = await auth.api.getSession({
          headers: request.headers,
    });
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json()
    const { prompt: apiKey, llm } = body as { llm: LLMProvider; prompt: string }
    try{
      let operator = null
      let model;
      switch(llm){
        case "openrouter":
          operator = createOpenRouter({
            apiKey:apiKey
          })
          model = "google/gemini-2.5-flash-lite";
          break;
        case "anthropic":
          operator = createAnthropic({
            apiKey:apiKey
          })
          model = "claude-sonnet-4-20250514"
          break;
        default:
          operator = createOpenAI({
            apiKey:apiKey,
          })
          model = "gpt-3.5-turbo"
      }
     const {text} = await generateText({
      model: operator(model),
      prompt: "just return me with what is the 1+1 ? "
    })
    console.log(text)
    return Response.json({message: "ok"}, {status:200})
    }catch(error){
      console.log(error)
      return Response.json({error: "Invalid api key"}, {status: 500})
    }

}
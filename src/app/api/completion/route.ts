import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt, chatId} = body as { prompt: string; id: string }

    console.log('PROMPT', prompt, chatId)

    const result = streamText({
      model: openai('gpt-4o'),
      prompt: prompt,
    })

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('API Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
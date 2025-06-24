// app/api/llms/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db/index';
import { llm, model } from '@/db/schema/model';

export async function GET() {
  const llms = await db.select().from(llm);
  const models = await db.select().from(model);
  
  const result = llms.map(l => ({
    ...l,
    models: models.filter(m => m.llmId === l.id)
  }));
  
  return NextResponse.json(result);
}
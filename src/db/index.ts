import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as modelSchema from './schema/model'
import * as aiChatSchema from './schema/ai-chat'

export const db = drizzle(process.env.DATABASE_URL!, {schema: {...modelSchema, ...aiChatSchema}});


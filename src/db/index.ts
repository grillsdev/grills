import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import * as modelSchema from './schema/model'

export const db = drizzle(process.env.DATABASE_URL!, {schema: {...modelSchema}});


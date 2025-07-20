// import 'dotenv/config';
// import { drizzle } from 'drizzle-orm/node-postgres';
// import { Pool } from 'pg';

// import * as modelSchema from './schema/model';
// import * as aiChatSchema from './schema/ai-chat';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' 
//     ? { rejectUnauthorized: false } 
//     : false
// });

// export const db = drizzle(pool, {
//   schema: { ...modelSchema, ...aiChatSchema }
// });

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as modelSchema from './schema/model';
import * as aiChatSchema from './schema/ai-chat';

const pool = new Pool({
  user: "avnadmin",
  password: "AVNS_hc6FE_AiGWzRFSB840X",
  host: "grills-esting-adityapushkar850-862f.c.aivencloud.com",
  port: 27138,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: false, // This allows self-signed certificates
  },
});;

export const db = drizzle(pool, {
  schema: { ...modelSchema, ...aiChatSchema }
});

import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/migration',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    host: "grills-esting-adityapushkar850-862f.c.aivencloud.com",
    port: 27138,
    user: "avnadmin",
    password: "AVNS_hc6FE_AiGWzRFSB840X",
    database: "defaultdb",
    ssl: {
      rejectUnauthorized: false, // This allows self-signed certificates
    }
  },
});
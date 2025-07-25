import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './src/db/migration',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgres://junglefowl:tM4-tL2_yW3_iR6=jQ7-@asia-south2-001.proxy.kinsta.app:30778/great-turquoise-cobra"
  },
});
import "dotenv/config";
import { cache } from "react";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as modelSchema from "./schema/model";
import * as aiChatSchema from "./schema/ai-chat";

export const getDb = cache(async () => {
  const { env } = await getCloudflareContext({ async: true });
  const connectionString = env.HYPERDRIVE.connectionString;

  const pool = new Pool({
    connectionString,
    // You don't want to reuse the same connection for multiple requests
    maxUses: 1,
  });

  return drizzle({ client: pool, schema: { ...modelSchema, ...aiChatSchema } });
});

/**
 * Modify this file according to your needs
 * ssl, no ssl url etc..
 * Hperdrive from cloudflare only support ssl/tsl connections
*/
const prod = false;


import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { prodConfig } from "./drizzle.db.config";


const localConfig = {
  url: process.env.LOCAL_DB_URL!
};

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: prod ? prodConfig : localConfig,
});

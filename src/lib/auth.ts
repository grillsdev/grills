import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db/index";
import * as authSchema from "../db/schema/auth"

export const auth = betterAuth({
    appName: "Grills",
    plugins: [nextCookies()],
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: authSchema
    })
});

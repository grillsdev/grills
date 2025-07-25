import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
});

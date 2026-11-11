import { createAuthClient } from "better-auth/react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

export const authClient = createAuthClient({
    baseURL: backendUrl,
});

export const { signIn, signUp, useSession, signOut } = authClient;

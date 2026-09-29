import { createAuthClient } from "better-auth/react";
// Import client-specific plugin (must be from "better-auth/client/plugins", not "better-auth/plugins")
import { twoFactorClient } from "better-auth/client/plugins";

/**
 * Client-side Better Auth instance.
 * Exposes methods and React hooks for user actions (signIn, signUp, signOut, twoFactor, useSession).
 */
export const authClient = createAuthClient({
    /**
     * Root URL for Better Auth API routes (/api/auth/*).
     * In production, replace or use process.env.NEXT_PUBLIC_APP_URL.
     * Can also be omitted if your frontend and API run on the exact same origin.
     */
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

    plugins: [
        /**
         * Client-side 2FA plugin:
         * - Exposes methods like authClient.twoFactor.verifyTotp, enable, disable, and backup codes.
         * - onTwoFactorRedirect: automatically routes to /two-factor when client-side signIn triggers a 2FA challenge.
         */
        twoFactorClient({
            onTwoFactorRedirect() {
                window.location.href = "/two-factor";
            },
        }),
    ],
});
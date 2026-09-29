// SERVER ACTION
"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Better Auth server instance
import { APIError } from "better-auth/api";

// Standard return type ensuring type safety across client form submissions
export interface AuthResponse {
    success: boolean;
    message: string;
    twoFactorRedirect?: boolean;
}

/**
 * Handles credentials sign-in on the server.
 * Reads/writes HTTP cookies and checks whether 2FA verification is required.
 */
export const signIn = async (
    email: string,
    password: string
): Promise<AuthResponse> => {
    try {
        // Pass request headers so Better Auth can read and write session/challenge cookies
        const res = await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,
                password,
            },
        });

        // If user has 2FA enabled, Better Auth returns twoFactorRedirect: true without a full session
        const is2FA = Boolean((res as any)?.twoFactorRedirect);

        return {
            success: true,
            message: is2FA ? "2FA verification required" : "User signed in successfully",
            twoFactorRedirect: is2FA,
        };
    } catch (error) {
        // Catch known Better Auth API errors (invalid credentials, rate limiting, etc.)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.message || "Authentication failed",
                twoFactorRedirect: false,
            };
        }

        // Generic JavaScript runtime errors
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                twoFactorRedirect: false,
            };
        }

        // Fallback for unexpected non-error throws
        return {
            success: false,
            message: "Something went wrong",
            twoFactorRedirect: false,
        };
    }
};

/**
 * Creates a new user record in the database.
 * Sets the initial session cookie upon successful creation.
 */
export const signUp = async (
    email: string,
    password: string,
    username: string
): Promise<AuthResponse> => {
    try {
        // Pass request headers so Better Auth can issue the new session cookie immediately
        await auth.api.signUpEmail({
            headers: await headers(),
            body: {
                email,
                password,
                name: username,
                callbackURL: "/dashboard",
            },
        });

        return {
            success: true,
            message: "User signed up successfully",
        };
    } catch (error) {
        // Catch Better Auth errors (e.g. duplicate email, weak password)
        if (error instanceof APIError) {
            return {
                success: false,
                message: error.message || "Failed to create account",
            };
        }

        // Generic JavaScript runtime errors
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
            };
        }

        // Fallback for unexpected non-error throws
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};
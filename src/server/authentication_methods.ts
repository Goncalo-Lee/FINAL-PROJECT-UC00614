"use server"

import { auth } from "@/lib/auth";

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            message: "User signed in"
        }
    } catch (error: any) {
        const e = error as Error
        return {
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong"
        };
    }
}

export const signUp = async (email: string, password: string, username: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            }
        })
        return {
            success: true,
            message: "User signed up"
        }
    } catch (error) {
        const e = error as Error
        return {
            success: false,
            message: { error: e.message  || "Something went wrong" }
        }
    }
}




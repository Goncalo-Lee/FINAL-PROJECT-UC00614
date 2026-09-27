import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import {nextCookies} from "better-auth/next-js";
import * as schema from "@/db/schema";
import {Resend} from "resend"; // your drizzle instance
import { ResetPasswordEmail}  from "@/components/emails/reset-password";
import VerificationEmail from "@/components/emails/verification-email";
import { twoFactor} from "better-auth/plugins";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema, // or "mysql", "sqlite"
    }),

    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({user, url,}) => {
            console.log("A tentar enviar email para:", user.email);

            const { data, error } = await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Verify your email",
                react: VerificationEmail({username: user.name, verificationUrl: url}),
            });

            if (error) {
                console.error("ERRO RESEND:", error);
            } else {
                console.log("Email sent successfully!", data);
            }
        },
    },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({user, url}) => {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: ["joaoamaral1706@gmail.com"],
                subject: "Reset your password",
                react: ResetPasswordEmail({username: user.name, resetUrl: url, userEmail: user.email}),
            })
        },
        requireEmailVerification: true,
        sendVerificationEmail: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    appName: "FortisLibertas",
    plugins: [
        twoFactor({
            issuer: "Fortis Libertas",
            totpOptions: {
                digits: 6,
                period: 30,
                // Permite 1 ou 2 passos de 30s para trás e para a frente:
                window: 1,
            },
        }),
        nextCookies(),
    ]
});
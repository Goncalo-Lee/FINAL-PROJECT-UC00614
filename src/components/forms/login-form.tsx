"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import React from "react";
import { signIn } from "@/server/authentication_methods";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

// Client-side validation rules for user input
const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

/**
 * Main login component: provides email/password and social login options.
 */
export function LoginForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();

    // Sets up form state and links it to the Zod schema validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Handles social login via Google using Better Auth client SDK
    const signInWithGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
        router.push("/dashboard");
    };

    // Submits email/password to the server and handles normal vs 2FA routing
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Show loading indicator from React Hook Form
        // Loading spinner or spinning circle" rotating
        setIsLoading(true);

        try {
            const res = await signIn(values.email, values.password);

            if (res.success) {
                // If the user has 2FA enabled, redirect to enter the verification code
                if (res.twoFactorRedirect) {
                    toast.info("Please enter your 2FA code.");
                    router.push("/two-factor");
                    return;
                }

                // Standard login: redirect straight to the dashboard
                toast.success(res.message);
                router.push("/dashboard");
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            // When its done it stops the circle from spinning
            setIsLoading(false);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Apple or Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={signInWithGoogle}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    {...form.register("email")}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    {...form.register("password")}
                                />
                            </Field>

                            <Field>
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <Link href="/privacy">Privacy Policy</Link>.
            </FieldDescription>
        </div>
    );
}
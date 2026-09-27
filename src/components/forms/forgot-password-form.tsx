"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


import { z } from "zod"
import React from "react";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {authClient} from "@/lib/auth-client";

const formSchema = z.object({
    email: z.string().email(),
})

export function ForgotPasswordForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Estou aqui!");

        setIsLoading(true);


        const { error } = await authClient.requestPasswordReset({
            email: values.email, // required, The email address of the user to send a password reset email to
            redirectTo: "/reset-password", // The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN
        });


        if (error) {
            toast.error(error.message);
        }
        else {
            toast.success("Password reset email sent. Please check your inbox.");
        }
        setIsLoading(false);
    }


    return (
        <div className={cn("flex flex-col gap-6")} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Recover your password</CardTitle>
                    <CardDescription>
                        Put your email address below to receive a link to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
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
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : (
                                        "Reset password"
                                    )}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

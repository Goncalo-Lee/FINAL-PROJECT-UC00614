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
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


import { z } from "zod"
import React from "react";
import {toast} from "sonner";
import {useRouter, useSearchParams} from "next/navigation";
import {Loader2} from "lucide-react";
import {authClient} from "@/lib/auth-client";

const formSchema = z.object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export function ResetPasswordForm({
                                       className,
                                       ...props
                                   }: React.ComponentProps<"div">) {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") as string;
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Estou aqui!");

        setIsLoading(true);

        if (values.password !== values.confirmPassword) {
            toast.error("Passwords do not match");
            setIsLoading(false);
            return;
        }


        const { error } = await authClient.resetPassword({
            newPassword: values.password,
            token,
        });


        if (error) {
            toast.error(error.message);
        }
        else {
            toast.success("Password reset successful. You can now log in with your new password.");
            router.push("/login");
        }
        setIsLoading(false);
    }


    return (
        <div className={cn("flex flex-col gap-6")} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Reset your password</CardTitle>
                    <CardDescription>
                        Put your new password below to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="password">New Password</FieldLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="yournewpassword"
                                    {...form.register("password")}
                                    required
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="confirmPassword">Confirm your new Password</FieldLabel>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="yournewpassword"
                                    {...form.register("confirmPassword")}
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

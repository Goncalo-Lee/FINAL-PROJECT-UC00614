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
import { signUp} from "@/server/authentication_methods";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Loader2} from "lucide-react";
import {authClient} from "@/lib/auth-client";

const formSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
})

export function SignupForm({
                              className,
                              ...props
                          }: React.ComponentProps<"div">) {
    const [isLoading, setIsLoading] = React.useState(false);

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",

        }
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const { success, message } = await signUp(values.email, values.password, values.username);

        if (success) {
            toast.success(message as string);
        }
        else {
            toast.error(message as string);
        }
        setIsLoading(false);
    }

    return (
        <div className={cn("flex flex-col gap-6")} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Create your account</CardTitle>
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
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    id="username"
                                    type="username"
                                    placeholder="username"
                                    {...form.register("username")}
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
                                        "Create account"
                                    )}
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}

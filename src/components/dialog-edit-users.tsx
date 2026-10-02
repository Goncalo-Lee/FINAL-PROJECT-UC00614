import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UserItem } from "./DataTableUsers"

interface DialogEditUsersProps {
    user: UserItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function DialogEditUsers({
                                    user,
                                    open,
                                    onOpenChange,
                                    onSuccess,
                                }: DialogEditUsersProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string

        // Save logic here
        console.log({ id: user?.id, name, email })

        onSuccess?.()
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Edit user</DialogTitle>
                        <DialogDescription>
                            Make changes to the user profile here.
                        </DialogDescription>
                    </DialogHeader>

                    <FieldGroup>
                        <Field>
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                name="name"
                                defaultValue={user?.name ?? ""}
                                key={`name-${user?.id ?? "empty"}`}
                                required
                            />
                        </Field>
                        <Field>
                            <Label htmlFor="edit-email">Email</Label>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                defaultValue={user?.email ?? ""}
                                key={`email-${user?.id ?? "empty"}`}
                                required
                            />
                        </Field>
                    </FieldGroup>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DialogEditUsers } from "@/components/dialog-edit-users";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteUser, updateUser } from "@/server/users";

export interface UserItem {
  id: string;
  name: string;
  email: string;
}

interface DataTableUsersProps {
  users: UserItem[];
  onEdit?: (user: UserItem) => void;
  onDelete?: (id: string) => void;
}

export function DataTableUsers({
                                 users,
                                 onEdit,
                                 onDelete,
                               }: DataTableUsersProps) {
  const userList = Array.isArray(users) ? users : [];
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleOpenEdit = (user: UserItem) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
    onEdit?.(user);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    const res = await deleteUser(id);

    if (res.success) {
      toast.success("User deleted successfully.");
      await new Promise((r) => setTimeout(r, 2500));
      location.reload();
    } else {
      toast.error("Failed to delete user. Please try again.");
    }

    onDelete?.(id);
  };

  return (
      <div className="w-full space-y-4">
        <div className="text-right">
          <Button>Add User</Button>
        </div>
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userList.length === 0 ? (
                  <TableRow>
                    <TableCell
                        colSpan={4}
                        className="h-24 text-center text-muted-foreground"
                    >
                      No records found.
                    </TableCell>
                  </TableRow>
              ) : (
                  userList.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {user.id}
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => handleOpenEdit(user)}
                                title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit {user.name}</span>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => handleDelete(user.id)}
                                title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete {user.name}</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </div>

        <DialogEditUsers
            user={selectedUser}
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSuccess={() => location.reload()}
        />
      </div>
  );
}
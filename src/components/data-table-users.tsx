"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {deleteUser} from "@/server/users";
import {updateUser} from "@/server/users";
import React, {useState} from "react";

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
  console.log("Value:", users);
  console.log("Is array?", Array.isArray(users));


  const userList = Array.isArray(users) ? users : [];

  const handleEdit = async (user: UserItem) => {

  }

  const handleDelete = async (id: string) => {
    window.confirm("Are you sure you want to delete this user?");

    const res = await deleteUser(id)

    if (res.success) {
      toast.success("User deleted successfully.");
      await new Promise((r) => setTimeout(r, 2500));

      location.reload()
    }
    else {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
      <div className="w-full space-y-4">
        <div className="text-right">
          <Button>Adicionar utilizador</Button>
        </div>
        <div className="rounded-md border bg-card">
          <Table >
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
                                onClick={() => handleEdit(user)}
                                title="Edit"
                            >
                              <Pencil className="h-4 w-4"/>
                              <span className="sr-only">Edit {user.name}</span>
                            </Button>


                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                onClick={() => handleDelete(user.id)}
                                title="Delete"
                            >
                              <Trash2 className="h-4 w-4"/>
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
      </div>
  );
}
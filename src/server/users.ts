"use server";

import { db } from "@/database";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;

// READ ALL
export async function getUsers() {
    try {
        const allUsers = await db.select().from(user);
        return { data: allUsers };
    } catch (error) {
        console.error("getUsers error:", error);
        return { error: "Failed to get users." };
    }
}

// READ ONE
export async function getUserById(id: number) {
    try {
        const [foundUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, id))
            .limit(1);

        if (!foundUser) {
            return { error: "User not found." };
        }

        return { data: foundUser };
    } catch (error) {
        console.error("getUserById error:", error);
        return { error: "Failed to find user." };
    }
}

// CREATE
export async function createUser(data: NewUser) {
    try {
        const [result] = await db.insert(user).values(data);

        // In MySQL, fetch the record using the generated insertId
        const createdId = result.insertId;
        const [newUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, createdId))
            .limit(1);

        return { data: newUser };
    } catch (error) {
        console.error("createUser error:", error);
        return { error: "Failed to create user." };
    }
}

// UPDATE
export async function updateUser(id: number, data: Partial<NewUser>) {
    try {
        const [result] = await db
            .update(user)
            .set(data)
            .where(eq(user.id, id));

        if (result.affectedRows === 0) {
            return { error: "User not found or no changes made." };
        }

        const [updatedUser] = await db
            .select()
            .from(user)
            .where(eq(user.id, id))
            .limit(1);

        return { data: updatedUser };
    } catch (error) {
        console.error("updateUser error:", error);
        return { error: "Failed to update user." };
    }
}

// DELETE
export async function deleteUser(id: number) {
    try {
        const [result] = await db
            .delete(user)
            .where(eq(user.id, id));

        if (result.affectedRows === 0) {
            return { error: "User not found." };
        }

        return { success: true };
    } catch (error) {
        console.error("deleteUser error:", error);
        return { error: "Failed to delete user." };
    }
}
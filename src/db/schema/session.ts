import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { user } from "./user";

export const session = mysqlTable("session", {
	id: t.varchar("id", { length: 36 }).primaryKey(),
	userId: t.varchar("user_id", { length: 36}).notNull().references(() => user.id, { onDelete: "cascade" }),
	token: t.varchar("token", { length: 255 }).notNull().unique(),
	expiresAt: t.timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
	ipAddress: t.text("ip_address"),
	userAgent: t.text("user_agent"),
	createdAt: t.timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
	updatedAt: t.timestamp("updated_at", { mode: "date", fsp: 3 }).notNull(),
}, (table) => [
	t.index("session_userId_idx").on(table.userId),
]);

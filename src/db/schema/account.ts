import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";
import { user } from "./user";

export const account = mysqlTable("account", {
	id: t.varchar("id", { length: 36 }).primaryKey(),
	userId: t.varchar("user_id", { length: 36 }).notNull().references(() => user.id, { onDelete: "cascade" }),
	accountId: t.varchar("account_id", { length: 36 }).notNull(),
	providerId: t.varchar("provider_id", { length: 36 }).notNull(),
	accessToken: t.text("access_token"),
	refreshToken: t.text("refresh_token"),
	accessTokenExpiresAt: t.timestamp("access_token_expires_at", { mode: "date", fsp: 3 }),
	refreshTokenExpiresAt: t.timestamp("refresh_token_expires_at", { mode: "date", fsp: 3 }),
	scope: t.text("scope"),
	idToken: t.text("id_token"),
	password: t.text("password"),
	createdAt: t.timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
	updatedAt: t.timestamp("updated_at", { mode: "date", fsp: 3 }).notNull(),
}, (table) => [
	t.index("account_userId_idx").on(table.userId),
]);

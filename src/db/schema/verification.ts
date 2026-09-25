import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

export const verification = mysqlTable("verification", {
	id: t.varchar("id", { length: 36 }).primaryKey(),
	identifier: t.varchar("identifier", { length: 191 }).notNull(),
	value: t.text("value").notNull(),
	expiresAt: t.timestamp("expires_at", { mode: "date", fsp: 3 }).notNull(),
	createdAt: t.timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
	updatedAt: t.timestamp("updated_at", { mode: "date", fsp: 3 }).notNull(),
}, (table) => [
	t.index("verification_identifier_idx").on(table.identifier),
]);

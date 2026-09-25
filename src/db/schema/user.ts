import { mysqlTable } from "drizzle-orm/mysql-core";
import * as t from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
	id: t.varchar("id", { length: 36 }).primaryKey(),
	name: t.text("name").notNull(),
	email: t.varchar("email", { length: 255 }).notNull().unique(),
	emailVerified: t.boolean("email_verified").notNull(),
	image: t.text("image"),
	createdAt: t.timestamp("created_at", { mode: "date", fsp: 3 }).notNull(),
	updatedAt: t.timestamp("updated_at", { mode: "date", fsp: 3 }).notNull(),
});

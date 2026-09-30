import { relations } from "drizzle-orm";
import { mysqlTable, varchar, text, timestamp, boolean, int, index } from "drizzle-orm/mysql-core";
import { user } from "./user";

export const twoFactor = mysqlTable(
  "two_factor",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    secret: varchar("secret", { length: 255 }).notNull(),
    backupCodes: text("backup_codes").notNull(),
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    verified: boolean("verified").default(true),
    failedVerificationCount: int("failed_verification_count").default(0),
    lockedUntil: timestamp("locked_until", { fsp: 3 }),
  },
  (table) => [
    index("twoFactor_secret_idx").on(table.secret),
    index("twoFactor_userId_idx").on(table.userId),
  ],
);

export const twoFactorRelations = relations(twoFactor, ({ one }) => ({
  user: one(user, {
    fields: [twoFactor.userId],
    references: [user.id],
  }),
}));
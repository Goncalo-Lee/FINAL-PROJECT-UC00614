import { relations } from 'drizzle-orm';
import { mysqlTable, varchar, char, date, mysqlEnum, boolean, datetime } from 'drizzle-orm/mysql-core';
import { ulid } from 'ulid';


/**
 * ACCOUNT TABLE
 */
export const account = mysqlTable("account", {
  /* PRIMARY KEY - ULID */
  id: char('id', { length: 26 }).$defaultFn(() => ulid()).primaryKey(),
  /* DATA */
  first_name: varchar({ length: 50 }).notNull(),
  last_name: varchar({ length: 50 }).notNull(),
  birth_date: date().notNull(),
  phone: char({ length: 20 }).notNull(),
  email: varchar({ length: 53 }).notNull().unique(),
  password: varchar({ length: 255 }),
  role: mysqlEnum(['admin', 'user']).notNull().default('user'),
  is_active: boolean().notNull().default(false),
  profile_image: varchar({ length: 255 }),
  /* STATE AND TIME */
  soft_delete: boolean().notNull().default(false),
  created_at: datetime().notNull().$defaultFn(() => new Date()),
  updated_at: datetime().notNull().$onUpdate(() => new Date()),
});

export type Account = typeof account.$inferSelect;

export const accountRelations = relations(account, ({ many }) => ({
  twoFactorAuth: many(twoFactorAuth),
}));

/**
 * 2FA TABLE
 */
export const twoFactorAuth = mysqlTable("2fa", {
  /* PRIMARY KEY - ULID */
  id: char('id', { length: 26 }).$defaultFn(() => ulid()).primaryKey(),
  /* FOGERIGN KEY - ULID */
  id_account: char('id_account', { length: 26 }).notNull().references(() => account.id),
  /* DATA */
  code: char({ length: 6 }).notNull(),
  succeed: boolean().notNull().default(false),
  can_be_used: boolean().notNull().default(true),
  purpose: mysqlEnum(['login', 'password_reset', 'account_activation']).notNull(),
  /* STATE AND TIME */
  soft_delete: boolean().notNull().default(false),
  expired_at: datetime().notNull(),
  used_at: datetime(),
  created_at: datetime().notNull().$defaultFn(() => new Date()),
  updated_at: datetime().notNull().$onUpdate(() => new Date()),
});

export type TwoFactorAuth = typeof twoFactorAuth.$inferSelect;

export const twoFactorAuthRelations = relations(twoFactorAuth, ({ one }) => ({
  account: one(account, {
    fields: [twoFactorAuth.id_account],
    references: [account.id]
  }),
}));

/**
 * LOGIN_ATTEMPT_TABLE
**/


export const loginAttempt = mysqlTable("login_attempt", {
  /* PRIMARY KEY - ULID */
  id: char('id', { length: 26 }).$defaultFn(() => ulid()).primaryKey(),
  /* FOGERIGN KEY - ULID */
  id_account: char('id_account', { length: 26 }).notNull().references(() => account.id),
  /* DATA */
  device_fingerprint: varchar({ length: 255 }).notNull(),
  origin: mysqlEnum(['password', '2fa']).notNull(),
  success: boolean().notNull(),
  /* STATE AND TIME */
  soft_delete: boolean().notNull().default(false),
  created_at: datetime().notNull().$defaultFn(() => new Date()),
});

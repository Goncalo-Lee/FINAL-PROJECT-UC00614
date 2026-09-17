import { mysqlTable, varchar, char, date, mysqlEnum, boolean, datetime } from 'drizzle-orm/mysql-core';
import { ulid } from 'ulid';


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

export const twoFactorAuth = mysqlTable("2fa", {
  /* PRIMARY KEY - ULID */
  id: char('id', { length: 26 }).$defaultFn(() => ulid()).primaryKey(),
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
})



export type TwoFactorAuth = typeof twoFactorAuth.$inferSelect;

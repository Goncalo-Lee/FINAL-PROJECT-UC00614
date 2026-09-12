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
  email: varchar({ length: 50 }).notNull().unique(),
  password: varchar({ length: 255 }),
  role: mysqlEnum(['admin', 'user']).notNull().default('user'),
  is_active: boolean().notNull().default(false),
  profile_image: varchar({ length: 255 }),
  /* STATE AND TIME */
  soft_delete: boolean().notNull().default(false),
  created_at: datetime().notNull().$defaultFn(() => new Date()),
  updated_at: datetime().notNull().$onUpdate(() => new Date()),
})

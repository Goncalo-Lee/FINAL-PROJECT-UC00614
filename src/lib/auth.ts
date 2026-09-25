import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/index";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "mysql",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()]
});

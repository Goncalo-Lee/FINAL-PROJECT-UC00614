import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { account } from './db/schema';

// 1. Create a MySQL connection pool using your connection string
const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

// 2. Pass the pool object to drizzle
export const db = drizzle({client: poolConnection});

async function main() {
    const user: typeof account.$inferInsert = {
        first_name: 'John',
        last_name: "Peter",
        email: 'john@example.com',
        birth_date: new Date(),
        phone: "123456789"
    };
    await db.insert(account).values(user);
    console.log('New user created!')
    const users = await db.select().from(account);
    console.log('Getting all users from the database: ', users)
    /*
    const users: {
      id: number;
      name: string;
      age: number;
      email: string;
    }[]
    */
    await db
        .update(account)
        .set({
            first_name: 'teste',
        })
        .where(eq(account.email, user.email));
    console.log('User info updated!')
    await db.delete(account).where(eq(account.email, user.email));
    console.log('User deleted!')
}
main();

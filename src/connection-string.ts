import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { account } from './db/schema';

// 1. Create a MySQL connection pool using your connection string
const poolConnection = mysql.createPool(process.env.DATABASE_URL!);

// 2. Pass the pool object to drizzle
export const db = drizzle({client: poolConnection});

// MAY BE NECESSARY IN THE FUTURE
// src/db/seed2.ts
import { db } from './index'; // Import your configured db connection
import { account } from './schema'; // Import the tables you want to seed

async function main() {
    console.log('Seeding database...');

    try {
        // Example: Insert mock data into an account table
        for (let i = 0; i < 10; i++) {
            const user: typeof account.$inferInsert = {
                first_name: `John${i}`,
                last_name: `Doe${i}`,
                email: `example${i}@example.com`,
                birth_date: new Date(),
                phone: `123456789${i}`
            };
            await db.insert(account).values(user);
        }
        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection and exit the process
        process.exit(0);
    }
}

main();
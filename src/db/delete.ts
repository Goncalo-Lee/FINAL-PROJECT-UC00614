import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "./schema";

async function main() {
    const db = drizzle(process.env.DATABASE_URL!);

    // Apaga as tabelas
    await db.delete(schema.account);
    await db.delete(schema.twoFactorAuth);

    console.log("Tabelas apagadas com sucesso!");
}

main();
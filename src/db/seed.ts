import { drizzle } from "drizzle-orm/mysql2";
import { seed } from "drizzle-seed";
import * as schema from "./schema";

async function main() {
    const db = drizzle(process.env.DATABASE_URL!);

    // Popula as tabelas automaticamente
    await seed(db, schema);
    // Se adicionares um terceiro parametro em chave "{ quantidade }", ele vai seedar para cada tabela essa quantidade
    console.log("Base de dados povoada com sucesso!");
}

main();
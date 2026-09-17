
Para instalar drizzle-seed e drizzle-kit legacy-peer-deps:
npm install drizzle-kit@rc  --save --legacy-peer-deps
npm install drizzle-seed  --save --legacy-peer-deps

Levantar container:
docker compose up -d

Criar base de dados no phpadmin NextJS_Login
npx drizzle-kit push // Criar as tabelas na base de dados

Se quiser gerar migrations e faze-las acrescentar no package.json nos scripts:
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate"

e depois 
npm run db:generate
npm run db:migrate
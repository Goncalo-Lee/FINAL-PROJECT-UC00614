# Nome do Projeto

Projeto base com **Next.js**, **Better Auth** e **Drizzle ORM**, usando **MySQL** em **Docker**.

## Stack

- [Next.js](https://nextjs.org/) – framework web
- [Better Auth](https://www.better-auth.com/) – autenticação
- [Drizzle ORM](https://orm.drizzle.team/) – ORM e migrações
- MySQL (via Docker) – base de dados
- [Resend](https://resend.com/) – envio de emails (verificação e recuperação de password)

## Pré-requisitos

- Node.js e npm
- Docker e Docker Compose
- Conta no Resend (necessária para verificação de email e recuperação de password)

## Instalação

### 1. Instalar as dependências

```bash
npm install
```

Instala todas as dependências necessárias para o projeto correr.

### 2. Configurar as variáveis de ambiente

Cria/edita o ficheiro `.env` e ajusta os valores conforme pretendido (nome da base de dados, credenciais, etc.).

O projeto usa **MySQL** e **Docker**, por isso garante que as variáveis da base de dados coincidem com as definidas no `docker-compose.yml`.

### 3. Levantar os containers

```bash
docker-compose up -d
```

Cria e inicia os containers no Docker, incluindo a base de dados MySQL com o nome definido nas variáveis de ambiente.

### 4. Criar as tabelas na base de dados

```bash
npx drizzle-kit push
```

Faz uma migração rápida, criando as tabelas diretamente na base de dados. Ideal para prototipagem e desenvolvimento.

### 5. Arrancar o projeto

```bash
npm run dev
```

A aplicação fica disponível em [http://localhost:3000](http://localhost:3000).

## Verificação de email e recuperação de password

Para usar estas funcionalidades é necessário configurar o **Resend**:

1. Criar uma conta no [Resend](https://resend.com/).
2. Gerar uma API key e colocá-la nas variáveis de ambiente.
3. No ficheiro `auth.ts`, alterar o campo `to` para o email registado no Resend:

```ts
to: "maildoresend"
```

> Sem esta configuração, os emails de verificação e de recuperação de password não serão enviados.

## Resumo rápido

```bash
npm install
# configurar o .env
docker-compose up -d
npx drizzle-kit push
npm run dev
```
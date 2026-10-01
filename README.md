# Fortis Libertas Authentication System

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
- Conta no [Resend](https://resend.com/)
- Conta no [Google Cloud Console](https://console.cloud.google.com/)

---

## Instalação e Execução

### 1. Instalar as dependências

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

Cria um ficheiro `.env` na raiz do projeto com base no seguinte modelo:

```env
# Database
DATABASE_URL="mysql://root:password@localhost:3306/fortis_libertas"

# Better Auth
BETTER_AUTH_SECRET="o_teu_secret_gerado"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="o_teu_google_client_id"
GOOGLE_CLIENT_SECRET="o_teu_google_client_secret"

# Resend
RESEND_API_KEY="re_123456789"
```

### 3. Levantar os containers

```bash
docker-compose up -d
```

### 4. Criar as tabelas na base de dados

```bash
npx drizzle-kit push
```

### 5. Arrancar o projeto

```bash
npm run dev
```

A aplicação fica disponível em [http://localhost:3000](http://localhost:3000).

---

## Guia Rápido de Configuração das Chaves

### 1. Gerar o `BETTER_AUTH_SECRET`

É a chave criptográfica usada pelo Better Auth para assinar e proteger cookies e tokens de sessão.

- **Passo 1:** Corre o comando correspondente ao teu sistema:
  - **Linux / macOS / Git Bash:**
    ```bash
    openssl rand -base64 32
    ```
  - **Windows (PowerShell):**
    ```powershell
    [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 } | ForEach-Object { [byte]$_ }))
    ```
  - **Qualquer SO (via Node.js):**
    ```bash
    node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
    ```
    
- **Passo 2:** Copia o valor gerado e cola na variável `BETTER_AUTH_SECRET` no teu ficheiro `.env`.

### 2. Obter Credenciais Google OAuth (`GOOGLE_CLIENT_ID` e `SECRET`)
- **Passo 1:** No [Google Cloud Console](https://console.cloud.google.com/), cria um projeto e configura o ecrã de consentimento OAuth (*APIs e Serviços > Ecrã de consentimento*).
- **Passo 2:** Vai a *Credenciais > Criar Credenciais > ID do cliente OAuth* e escolhe **Aplicação Web**.
- **Passo 3:** Em **URIs de redirecionamento autorizados**, adiciona `http://localhost:3000/api/auth/callback/google`, cria e copia o ID e o Secret para o `.env`.

### 3. Obter a Resend API Key (`RESEND_API_KEY`)
- **Passo 1:** Entra em [Resend.com](https://resend.com/) e acede a **API Keys** no menu lateral.
- **Passo 2:** Clica em **Create API Key**, copia a chave gerada e define-a na variável `RESEND_API_KEY`.
- **Passo 3:** Em desenvolvimento, envia apenas emails para o endereço associado à tua conta Resend usando `onboarding@resend.dev` como remetente.

---

## Resolução de Problemas (Troubleshooting)

Se os containers falharem ao levantar, ocorrerem conflitos de porta ou erros de permissão com o MySQL antes de criar a base de dados:

```bash
# Para os containers e apaga os volumes com dados antigos
docker-compose down -v

# Levanta novamente a base de dados limpa
docker-compose up -d

# Empurra o schema outra vez
npx drizzle-kit push
```

---

## Resumo para um script rápido

# 1. Configurar as variáveis de ambiente
cp .env.example .env

# 2. Instalar dependências e levantar serviços
npm install
docker-compose up -d
npx drizzle-kit push
npm run dev
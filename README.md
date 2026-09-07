# CMS — Blog Pessoal

Backend e painel de administração do blog pessoal, construído com [Payload CMS 3.0](https://payloadcms.com) sobre Next.js 16. Roda na porta **3001** (o frontend fica na 3000).

## O que tem aqui

Cinco collections gerenciadas pelo painel em `/admin`:

- **Posts** — artigos do blog com editor rich text (Lexical), slug gerado automaticamente, categorias e tags relacionadas.
- **Categories** — categorias dos posts.
- **Tags** — tags dos posts.
- **Media** — upload e gerenciamento de arquivos de mídia, processados com Sharp.
- **Users** — usuários com acesso ao painel de administração.

O admin usa interface em português (PT-BR). O formulário de login tem uma tela customizada. Requisições ao CMS passam por proteção via Cloudflare Turnstile.

---

## Banco de dados e migrations

O banco é PostgreSQL.

Em **desenvolvimento**, o Payload usa `push` automático: ao subir o servidor, ele detecta diferenças entre o schema das collections e o banco e aplica as mudanças diretamente. Não é necessário rodar migrations manualmente para desenvolver.

Em **produção**, o push está desativado (`push: false` é definido via `NODE_ENV=production` internamente pelo adapter). Toda mudança de schema precisa de um arquivo de migration explícito gerado antes do deploy.

Os arquivos de migration ficam em `src/migrations` e devem ser commitados no repositório.

### Gerar uma migration (antes de fazer deploy)

Depois de finalizar alterações em qualquer Collection ou Global:

```bash
pnpm run payload migrate:create
```

Revise o arquivo gerado em `src/migrations` antes de commitar.

### Aplicar migrations em produção (Dokploy / VPS)

O build `standalone` do Next.js remove o CLI do Payload e os arquivos `.ts`. As migrations de produção rodam de forma isolada via `Dockerfile.migrate`.

Para executar o container de migrations, as seguintes **variáveis de ambiente** são necessárias:

- `DATABASE_URI` (essencial): String de conexão com o banco de dados PostgreSQL.
- `PAYLOAD_SECRET` (essencial): Chave secreta do Payload.
- `FRONTEND_URL`, `PAYLOAD_PUBLIC_SERVER_URL` e `CORS_ORIGINS` (opcionais): Possuem valores padrão na configuração e não quebrarão a migration se omitidas.

Processo:

1. Crie um serviço secundário do tipo "Compose" (ou um Job) na plataforma de hospedagem.
2. Configure o build para usar o `Dockerfile.migrate`.
3. Defina as variáveis de ambiente necessárias (`DATABASE_URI` e `PAYLOAD_SECRET`).
4. Defina a política de reinicialização para **não reiniciar** (`restart: "no"` ou `condition: none` no Docker Swarm).
5. Ao fazer o deploy desse serviço, o container roda `pnpm run payload migrate`, aplica as migrations pendentes e encerra — sem afetar o servidor web.

---

## Desenvolvimento local

### Pré-requisitos

- Node.js >= 20.9.0
- pnpm
- Docker e Docker Compose

### Como iniciar

1. Instale as dependências:
   ```bash
   pnpm install
   ```

2. Copie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

3. Suba o banco de dados:
   ```bash
   docker compose up -d
   ```

4. (Opcional) Popule o banco com dados de exemplo:
   ```bash
   pnpm run seed
   ```

5. Inicie o servidor:
   ```bash
   pnpm dev
   ```

O painel fica disponível em `http://localhost:3001/admin`.

O Payload aplica as mudanças de schema automaticamente ao subir em desenvolvimento — não é necessário rodar migrations manualmente.

> Se o servidor não subir por cache corrompido do Next.js, use `pnpm devsafe` — ele apaga `.next` antes de iniciar.

---

## Deploy em produção

O `next.config.ts` usa `output: 'standalone'`, gerando uma imagem Docker leve.

### Variáveis de ambiente necessárias

```env
NODE_ENV=production
DATABASE_URI=postgresql://usuario:senha@host:5432/nome_db
PAYLOAD_SECRET=sua-chave-secreta
PORT=3000
PAYLOAD_PUBLIC_SERVER_URL=https://cms.seudominio.com.br
FRONTEND_URL=https://seudominio.com.br
CORS_ORIGINS=https://seudominio.com.br
NEXT_PUBLIC_TURNSTILE_SITE_KEY=sua-site-key-turnstile
TURNSTILE_SECRET_KEY=sua-secret-key-turnstile
```

> `PORT=3001` é usado apenas em desenvolvimento local para não colidir com o frontend. O Dockerfile de produção usa 3000 como padrão.

### Fluxo de deploy

1. Rode as migrations de produção com o `Dockerfile.migrate` (ver seção acima).
2. Faça o build da aplicação com o `Dockerfile` principal. Ela se conecta ao banco já migrado e fica disponível na porta configurada em `PORT`.

---

## Testes

Rodar todos os testes:

```bash
pnpm test
```

Por tipo:

- E2E (Playwright): `pnpm test:e2e`
- Integração (Vitest): `pnpm test:int`

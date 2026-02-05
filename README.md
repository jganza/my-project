# ADONAI.AI Monorepo

ADONAI.AI is a Biblical wisdom guide rooted in Protestant–Evangelical Christianity. The platform ships as a Turborepo with a Next.js web app, an Expo mobile app, and a Fastify API. Scripture quotes are **only** emitted verbatim when retrieved from the stored Bible dataset.

## Stack
- Monorepo: Turborepo + pnpm + TypeScript
- Web: Next.js (App Router), Tailwind
- Mobile: React Native (Expo)
- API: Fastify + OpenAI Responses API
- DB: Postgres + Prisma
- Auth: Supabase Auth (shared across web + mobile)

## Repo Structure
```
/apps
  /web          Next.js web app
  /mobile       Expo app
  /api          Fastify API
/packages
  /shared       Zod schemas + shared types
  /adonai-prompt ADONAI system prompt
  /bible        Scripture parsing + import tools
prisma/schema.prisma
```

## Local Development

### 1) Install dependencies
```
pnpm install
```

### 2) Configure environment
Copy the sample env files and fill in values:
```
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env
```

### 3) Database setup
```
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/adonai
pnpm --filter @adonai/api prisma migrate dev --name init
pnpm --filter @adonai/api prisma db seed
```

### 3a) Full WEB import (optional)
Place your TSV file at `./data/web.tsv` (or any path) and run:
```
pnpm --filter @adonai/bible bible:import --file ./data/web.tsv --truncate
pnpm --filter @adonai/bible validate:import
```

### 4) Run the apps
```
pnpm dev
```

The API defaults to `http://localhost:4000`, the web app to `http://localhost:3000`, and Expo provides a QR code for mobile.

## Scripture Dataset
- Default translation: **World English Bible (WEB)**
- Verses are stored in `BibleVerse` and served by the `get_scripture` tool on the API.
- A minimal seed dataset is included for local development (`prisma/seed.ts`). Use the full import for production.

### Import full WEB dataset
Prepare a local TSV file (no network fetch at runtime). Expected columns:
```
translation\tbook\tchapter\tverse\ttext
```

Example (5 lines):
```
translation\tbook\tchapter\tverse\ttext
WEB\tJohn\t3\t16\tFor God so loved the world...
WEB\tJohn\t3\t17\tFor God didn't send his Son into the world...
WEB\tJohn\t3\t18\tHe who believes in him is not judged...
WEB\tPsalms\t23\t1\tYahweh is my shepherd: I shall lack nothing.
```

Run:
```
pnpm --filter @adonai/bible bible:import --file ./data/web.tsv --truncate
pnpm --filter @adonai/bible validate:import
```

## API Highlights
- `POST /v1/chat` requires a Supabase JWT and uses OpenAI Responses API with the `get_scripture` tool.
- `GET /v1/scripture` fetches verses by reference from the stored dataset.
- Conversation history, journal entries, and saved scriptures are persisted per user.

## Quality
```
pnpm lint
pnpm typecheck
pnpm test
```

### Parser + import validation
```
pnpm --filter @adonai/bible test
pnpm --filter @adonai/bible validate:import
```

## Deployment Notes
- Provision Postgres and apply Prisma migrations.
- Configure Supabase Auth and set `SUPABASE_JWT_SECRET` in the API environment.
- Set `OPENAI_API_KEY` server-side only.
- Configure web/mobile with Supabase public keys and API base URL.

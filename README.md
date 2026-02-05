# ADONAI.AI

ADONAI.AI is a production-ready web + mobile-first chat experience for Biblical counsel rooted in Protestant-Evangelical Christianity. It includes a Next.js frontend, an Express API, and SQLite storage powered by Prisma.

## Architecture
- **Frontend:** Next.js App Router with a chat interface, conversation list, Counsel Mode toggle, and Prayer/Journal page.
- **Backend:** Express API with OpenAI Responses API integration at `/api/chat`.
- **Database:** SQLite via Prisma (conversations, messages, journal entries).

## Environment Setup

### Backend
1. Copy the environment example and update values:
   ```bash
   cd backend
   cp .env.example .env
   ```
2. Install dependencies and generate the Prisma client:
   ```bash
   npm install
   npm run prisma:generate
   ```
3. Create the SQLite database:
   ```bash
   npm run prisma:migrate
   ```
4. Start the API server:
   ```bash
   npm run dev
   ```

### Frontend
1. Copy the environment example and update values:
   ```bash
   cd frontend
   cp .env.local.example .env.local
   ```
2. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```

## Deployment Notes

### Backend
- Set `DATABASE_URL`, `OPENAI_API_KEY`, and `CLIENT_ORIGIN` in your hosting environment.
- Run `npm run prisma:deploy` during release to apply migrations.
- Use a process manager (PM2, systemd, or a platform like Render/Fly.io) to keep the server running.
- Configure rate limiting and logging via `express-rate-limit` and `morgan` (already included).

### Frontend
- Provide `NEXT_PUBLIC_API_BASE` at build time (e.g., Vercel environment variables).
- Build with `npm run build` and serve with `npm run start` on a Node hosting platform.

## API Overview
- `POST /api/chat` `{ message, conversationId?, counselMode? }`
- `GET /api/conversations`
- `GET /api/conversations/:id/messages`
- `GET /api/journal`
- `POST /api/journal` `{ title, content }`

## Mobile Readiness
The layout uses responsive styling and supports mobile-first usage out of the box. For a native wrapper, deploy the Next.js frontend to a mobile WebView (Expo, Capacitor) and keep the API hosted.

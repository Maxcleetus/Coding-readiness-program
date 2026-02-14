# Server Setup

## 1) Install dependencies

```bash
cd server
npm install
```

## 2) Configure env

```bash
cp .env.example .env
```

Set `MONGODB_URI` to your MongoDB connection string.
Set `JWT_SECRET` to a strong random string.
Set allowed frontend origins:

- `CLIENT_ORIGIN=http://localhost:5173` (main app)
- `ADMIN_ORIGIN=http://localhost:5174` (admin app)
- optional `CORS_ORIGINS` as comma-separated extra origins

## 3) Run backend

```bash
npm run dev
```

Server runs on `http://localhost:5000` by default.

## API Endpoints

- `GET /api/health`
- `GET /api/today-challenge`
- `GET /api/questions`
- `GET /api/leaderboard?type=students`
- `GET /api/leaderboard?type=groups`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token required)
- `GET /api/admin/overview` (Bearer token required)
- `POST|PUT|DELETE /api/admin/challenges` (Bearer token required)
- `POST|PUT|DELETE /api/admin/questions` (Bearer token required)
- `POST|PUT|DELETE /api/admin/leaderboard` (Bearer token required)

## Default Admin

On first startup, if no admin exists, one is seeded from `.env`:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

## Deploy On Vercel

1. Create a new Vercel project and set **Root Directory** to `server`.
2. Add environment variables in Vercel Project Settings:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN` (optional)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `CLIENT_ORIGIN` (your frontend Vercel URL)
   - `ADMIN_ORIGIN` (optional, if admin frontend is deployed)
   - `CORS_ORIGINS` (optional, comma-separated extra origins)
3. Deploy. Vercel will use `api/[...all].js` as a serverless function.
4. Verify backend health:
   - `https://<your-server-project>.vercel.app/api/health`

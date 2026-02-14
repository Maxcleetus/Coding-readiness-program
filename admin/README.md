# Admin Panel (Separate App)

This is a standalone admin frontend for managing content via the backend JWT API.

## Run

```bash
cd admin
npm install
npm run dev
```

Runs by default on `http://localhost:5174`.

## Env

```bash
cp .env.example .env
```

`VITE_API_BASE_URL` defaults to `/api` and uses Vite proxy to `http://localhost:5000`.

## Backend requirement

Backend must be running with JWT auth enabled (`server` app).

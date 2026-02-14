import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import challengeRoutes from './routes/challengeRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed.js';

const app = express();
let initPromise;

const normalizeOrigin = (origin) => (origin || '').trim().replace(/\/+$/, '');
const isCodingReadinessVercelOrigin = (origin) =>
  /^https:\/\/coding-readiness-program(?:-[a-z0-9-]+)?\.vercel\.app$/i.test(origin);

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.ADMIN_ORIGIN,
  ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : []),
]
  .filter(Boolean)
  .map((origin) => normalizeOrigin(origin));

export const isOriginAllowed = (origin) => {
  if (!origin) return true;
  const normalizedOrigin = normalizeOrigin(origin);

  if (allowedOrigins.includes(normalizedOrigin)) return true;

  // Allow all Coding Readiness Vercel domains (prod + preview/admin subprojects).
  if (isCodingReadinessVercelOrigin(normalizedOrigin)) return true;

  if (allowedOrigins.length === 0) return true;
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', challengeRoutes);
app.use('/api', questionRoutes);
app.use('/api', leaderboardRoutes);
app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export const initializeApp = async () => {
  if (!initPromise) {
    initPromise = (async () => {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is required. Configure it in server/.env');
      }

      await connectDB();
      await seedDatabase();
    })();
  }

  return initPromise;
};

export default app;

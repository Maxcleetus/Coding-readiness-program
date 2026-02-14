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

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.ADMIN_ORIGIN,
  ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : []),
]
  .filter(Boolean)
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins.length === 0 ? '*' : allowedOrigins,
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

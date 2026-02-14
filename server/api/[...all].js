import app, { initializeApp } from '../src/app.js';

export default async function handler(req, res) {
  try {
    await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error('Vercel handler error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

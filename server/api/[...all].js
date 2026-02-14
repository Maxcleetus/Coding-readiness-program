import app, { initializeApp } from '../src/app.js';

const applyCorsHeaders = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
};

export default async function handler(req, res) {
  try {
    applyCorsHeaders(req, res);

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    await initializeApp();
    return app(req, res);
  } catch (error) {
    console.error('Vercel handler error:', error);
    applyCorsHeaders(req, res);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

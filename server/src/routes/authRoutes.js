import { Router } from 'express';
import { getCurrentAdmin, loginAdmin } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/auth/login', (_req, res) => {
  res.status(405).json({ message: 'Method Not Allowed. Use POST /api/auth/login.' });
});
router.post('/auth/login', loginAdmin);
router.get('/auth/me', requireAuth, getCurrentAdmin);

export default router;

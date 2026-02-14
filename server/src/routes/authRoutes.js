import { Router } from 'express';
import { getCurrentAdmin, loginAdmin } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/auth/login', loginAdmin);
router.get('/auth/me', requireAuth, getCurrentAdmin);

export default router;


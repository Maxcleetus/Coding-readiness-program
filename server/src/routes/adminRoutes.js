import { Router } from 'express';
import {
  createChallenge,
  createLeaderboardEntry,
  createQuestion,
  deleteChallenge,
  deleteLeaderboardEntry,
  deleteQuestion,
  getAdminOverview,
  updateChallenge,
  updateLeaderboardEntry,
  updateQuestion,
} from '../controllers/adminController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use('/admin', requireAuth);

router.get('/admin/overview', getAdminOverview);

router.post('/admin/challenges', createChallenge);
router.put('/admin/challenges/:id', updateChallenge);
router.delete('/admin/challenges/:id', deleteChallenge);

router.post('/admin/questions', createQuestion);
router.put('/admin/questions/:id', updateQuestion);
router.delete('/admin/questions/:id', deleteQuestion);

router.post('/admin/leaderboard', createLeaderboardEntry);
router.put('/admin/leaderboard/:id', updateLeaderboardEntry);
router.delete('/admin/leaderboard/:id', deleteLeaderboardEntry);

export default router;


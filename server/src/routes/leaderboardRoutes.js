import { Router } from 'express';
import { getLeaderboardByType } from '../controllers/leaderboardController.js';

const router = Router();

router.get('/leaderboard', getLeaderboardByType);

export default router;

import { Router } from 'express';
import { getCompetitionWinner } from '../controllers/winnerController.js';

const router = Router();

router.get('/competition-winner', getCompetitionWinner);

export default router;

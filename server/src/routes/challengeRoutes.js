import { Router } from 'express';
import { getTodayChallenge } from '../controllers/challengeController.js';

const router = Router();

router.get('/today-challenge', getTodayChallenge);

export default router;

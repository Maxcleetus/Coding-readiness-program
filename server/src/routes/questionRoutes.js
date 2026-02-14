import { Router } from 'express';
import { getQuestions } from '../controllers/questionController.js';

const router = Router();

router.get('/questions', getQuestions);

export default router;

import CompetitionWinner from '../models/CompetitionWinner.js';

export const getCompetitionWinner = async (_req, res, next) => {
  try {
    const winner = await CompetitionWinner.findOne().lean();

    if (!winner) {
      return res.status(404).json({ message: 'Competition winner not found' });
    }

    return res.json(winner);
  } catch (error) {
    return next(error);
  }
};

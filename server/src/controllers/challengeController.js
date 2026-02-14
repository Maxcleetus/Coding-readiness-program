import Challenge from '../models/Challenge.js';

export const getTodayChallenge = async (_req, res, next) => {
  try {
    const activeChallenge = await Challenge.findOne({ isActive: true })
      .sort({ updatedAt: -1 })
      .lean();

    if (!activeChallenge) {
      return res.status(404).json({ message: 'No active challenge found' });
    }

    return res.json(activeChallenge);
  } catch (error) {
    return next(error);
  }
};

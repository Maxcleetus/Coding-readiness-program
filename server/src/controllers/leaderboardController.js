import LeaderboardEntry from '../models/LeaderboardEntry.js';

export const getLeaderboardByType = async (req, res, next) => {
  try {
    const { type = 'students' } = req.query;

    if (!['students', 'groups'].includes(type)) {
      return res.status(400).json({ message: 'type must be students or groups' });
    }

    const entries = await LeaderboardEntry.find({ type }).sort({ rank: 1 }).lean();
    return res.json(entries);
  } catch (error) {
    return next(error);
  }
};

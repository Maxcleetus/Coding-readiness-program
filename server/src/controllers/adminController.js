import Challenge from '../models/Challenge.js';
import Question from '../models/Question.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

const normalizeChallengeId = (value) => (value || '').trim();
const normalizeQuestionId = (value) => (value || '').trim();

const recalculateRanksByType = async (type) => {
  const entries = await LeaderboardEntry.find({ type })
    .sort({ points: -1, createdAt: 1, _id: 1 })
    .select('_id')
    .lean();

  if (entries.length === 0) {
    return;
  }

  const tempOffset = entries.length + 1000;

  await LeaderboardEntry.bulkWrite(
    entries.map((entry, index) => ({
      updateOne: {
        filter: { _id: entry._id },
        update: { $set: { rank: tempOffset + index + 1 } },
      },
    }))
  );

  await LeaderboardEntry.bulkWrite(
    entries.map((entry, index) => ({
      updateOne: {
        filter: { _id: entry._id },
        update: { $set: { rank: index + 1 } },
      },
    }))
  );
};

export const getAdminOverview = async (_req, res, next) => {
  try {
    const [challenges, questions, leaderboard] = await Promise.all([
      Challenge.find().sort({ createdAt: -1 }).lean(),
      Question.find().sort({ questionId: 1 }).lean(),
      LeaderboardEntry.find().sort({ type: 1, rank: 1 }).lean(),
    ]);

    return res.json({ challenges, questions, leaderboard });
  } catch (error) {
    return next(error);
  }
};

export const createChallenge = async (req, res, next) => {
  try {
    const payload = {
      challengeId: normalizeChallengeId(req.body.challengeId),
      title: req.body.title,
      difficulty: req.body.difficulty,
      category: req.body.category,
      link: req.body.link,
      description: req.body.description,
      isActive: Boolean(req.body.isActive),
      status: req.body.status || 'Ready for Debugging',
    };

    if (payload.isActive) {
      await Challenge.updateMany({ isActive: true }, { $set: { isActive: false } });
    }

    const created = await Challenge.create(payload);
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

export const updateChallenge = async (req, res, next) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const updates = req.body;

    if (updates.challengeId !== undefined) {
      challenge.challengeId = normalizeChallengeId(updates.challengeId);
    }
    if (updates.title !== undefined) challenge.title = updates.title;
    if (updates.difficulty !== undefined) challenge.difficulty = updates.difficulty;
    if (updates.category !== undefined) challenge.category = updates.category;
    if (updates.link !== undefined) challenge.link = updates.link;
    if (updates.description !== undefined) challenge.description = updates.description;
    if (updates.status !== undefined) challenge.status = updates.status;

    if (updates.isActive !== undefined) {
      const isActive = Boolean(updates.isActive);
      challenge.isActive = isActive;

      if (isActive) {
        await Challenge.updateMany(
          { _id: { $ne: challenge._id }, isActive: true },
          { $set: { isActive: false } }
        );
      }
    }

    await challenge.save();
    return res.json(challenge);
  } catch (error) {
    return next(error);
  }
};

export const deleteChallenge = async (req, res, next) => {
  try {
    const deleted = await Challenge.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

export const createQuestion = async (req, res, next) => {
  try {
    const created = await Question.create({
      questionId: normalizeQuestionId(req.body.questionId),
      title: req.body.title,
      difficulty: req.body.difficulty,
      category: req.body.category,
      description: req.body.description,
      snippet: req.body.snippet,
      link: req.body.link,
    });

    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

export const updateQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const updates = req.body;

    if (updates.questionId !== undefined) question.questionId = normalizeQuestionId(updates.questionId);
    if (updates.title !== undefined) question.title = updates.title;
    if (updates.difficulty !== undefined) question.difficulty = updates.difficulty;
    if (updates.category !== undefined) question.category = updates.category;
    if (updates.description !== undefined) question.description = updates.description;
    if (updates.snippet !== undefined) question.snippet = updates.snippet;
    if (updates.link !== undefined) question.link = updates.link;

    await question.save();
    return res.json(question);
  } catch (error) {
    return next(error);
  }
};

export const deleteQuestion = async (req, res, next) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Question not found' });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

export const createLeaderboardEntry = async (req, res, next) => {
  try {
    const type = req.body.type;
    const highestRank = await LeaderboardEntry.findOne({ type })
      .sort({ rank: -1 })
      .select('rank')
      .lean();

    const created = await LeaderboardEntry.create({
      type,
      rank: (highestRank?.rank || 0) + 1,
      name: req.body.name,
      points: Number(req.body.points),
      solves: req.body.solves === '' || req.body.solves === undefined ? undefined : Number(req.body.solves),
      members: req.body.members === '' || req.body.members === undefined ? undefined : Number(req.body.members),
    });

    await recalculateRanksByType(type);
    const updated = await LeaderboardEntry.findById(created._id).lean();

    return res.status(201).json(updated || created);
  } catch (error) {
    return next(error);
  }
};

export const updateLeaderboardEntry = async (req, res, next) => {
  try {
    const entry = await LeaderboardEntry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }

    const originalType = entry.type;
    const updates = req.body;

    if (updates.type !== undefined) entry.type = updates.type;
    if (updates.name !== undefined) entry.name = updates.name;
    if (updates.points !== undefined) entry.points = Number(updates.points);
    if (updates.solves !== undefined) {
      entry.solves = updates.solves === '' ? undefined : Number(updates.solves);
    }
    if (updates.members !== undefined) {
      entry.members = updates.members === '' ? undefined : Number(updates.members);
    }

    await entry.save();

    await recalculateRanksByType(originalType);
    if (entry.type !== originalType) {
      await recalculateRanksByType(entry.type);
    }

    const updated = await LeaderboardEntry.findById(entry._id).lean();
    return res.json(updated || entry);
  } catch (error) {
    return next(error);
  }
};

export const deleteLeaderboardEntry = async (req, res, next) => {
  try {
    const deleted = await LeaderboardEntry.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Leaderboard entry not found' });
    }

    await recalculateRanksByType(deleted.type);

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
};

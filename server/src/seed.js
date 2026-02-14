import bcrypt from 'bcryptjs';
import Challenge from './models/Challenge.js';
import Question from './models/Question.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import AdminUser from './models/AdminUser.js';
import { challengeSeed, leaderboardSeed, questionSeed } from './data/seedData.js';

export const seedDatabase = async () => {
  const [challengeCount, questionCount, leaderboardCount] = await Promise.all([
    Challenge.countDocuments(),
    Question.countDocuments(),
    LeaderboardEntry.countDocuments(),
  ]);

  const jobs = [];

  if (challengeCount === 0) {
    jobs.push(Challenge.insertMany(challengeSeed));
  }

  if (questionCount === 0) {
    jobs.push(Question.insertMany(questionSeed));
  }

  if (leaderboardCount === 0) {
    jobs.push(LeaderboardEntry.insertMany(leaderboardSeed));
  }

  const username = (process.env.ADMIN_USERNAME || 'admin').trim();
  const password = String(process.env.ADMIN_PASSWORD || 'admin123');
  const existingAdmin = await AdminUser.findOne({ username });
  const nextPasswordHash = await bcrypt.hash(password, 10);

  if (!existingAdmin) {
    jobs.push(
      AdminUser.create({
        username,
        passwordHash: nextPasswordHash,
        role: 'admin',
      })
    );
  } else {
    const matches = await bcrypt.compare(password, existingAdmin.passwordHash);
    if (!matches) {
      jobs.push(
        AdminUser.updateOne(
          { _id: existingAdmin._id },
          { $set: { passwordHash: nextPasswordHash } }
        )
      );
    }
  }

  if (jobs.length > 0) {
    await Promise.all(jobs);
    console.log('Seed data inserted');
  }

  // Backfill links for existing question records created before link support.
  await Promise.all(
    questionSeed.map((seedQuestion) =>
      Question.updateOne(
        {
          questionId: seedQuestion.questionId,
          $or: [{ link: { $exists: false } }, { link: null }, { link: '' }],
        },
        { $set: { link: seedQuestion.link } }
      )
    )
  );
};

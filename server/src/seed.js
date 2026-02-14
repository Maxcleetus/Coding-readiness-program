import bcrypt from 'bcryptjs';
import Challenge from './models/Challenge.js';
import Question from './models/Question.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import AdminUser from './models/AdminUser.js';
import { challengeSeed, leaderboardSeed, questionSeed } from './data/seedData.js';

export const seedDatabase = async () => {
  const [challengeCount, questionCount, leaderboardCount, adminCount] = await Promise.all([
    Challenge.countDocuments(),
    Question.countDocuments(),
    LeaderboardEntry.countDocuments(),
    AdminUser.countDocuments(),
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

  if (adminCount === 0) {
    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await bcrypt.hash(password, 10);

    jobs.push(
      AdminUser.create({
        username,
        passwordHash,
        role: 'admin',
      })
    );
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

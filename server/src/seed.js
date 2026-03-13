import bcrypt from 'bcryptjs';
import Challenge from './models/Challenge.js';
import Question from './models/Question.js';
import LeaderboardEntry from './models/LeaderboardEntry.js';
import CompetitionWinner from './models/CompetitionWinner.js';
import AdminUser from './models/AdminUser.js';
import {
  challengeSeed,
  competitionWinnerSeed,
  leaderboardSeed,
  questionSeed,
} from './data/seedData.js';

export const seedDatabase = async () => {
  const [challengeCount, questionCount, leaderboardCount, competitionWinnerCount] = await Promise.all([
    Challenge.countDocuments(),
    Question.countDocuments(),
    LeaderboardEntry.countDocuments(),
    CompetitionWinner.countDocuments(),
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

  if (competitionWinnerCount === 0) {
    jobs.push(CompetitionWinner.create(competitionWinnerSeed));
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

  // Backfill URLs for existing question records created before link/videoLink support.
  await Promise.all(
    questionSeed.flatMap((seedQuestion) => [
      Question.updateOne(
        {
          questionId: seedQuestion.questionId,
          $or: [{ link: { $exists: false } }, { link: null }, { link: '' }],
        },
        { $set: { link: seedQuestion.link } }
      ),
      Question.updateOne(
        {
          questionId: seedQuestion.questionId,
          $or: [{ videoLink: { $exists: false } }, { videoLink: null }, { videoLink: '' }],
        },
        { $set: { videoLink: seedQuestion.videoLink } }
      ),
    ])
  );

  await CompetitionWinner.updateOne(
    { singletonKey: 'competition-winner' },
    {
      $setOnInsert: {
        name: competitionWinnerSeed.name,
        imageData: competitionWinnerSeed.imageData,
      },
    },
    { upsert: true }
  );
};

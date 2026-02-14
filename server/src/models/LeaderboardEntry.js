import mongoose from 'mongoose';

const leaderboardEntrySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['students', 'groups'],
    },
    rank: { type: Number, required: true, min: 1 },
    name: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    solves: { type: Number, min: 0 },
    members: { type: Number, min: 0 },
  },
  { timestamps: true }
);

leaderboardEntrySchema.index({ type: 1, rank: 1 }, { unique: true });

export default mongoose.model('LeaderboardEntry', leaderboardEntrySchema);

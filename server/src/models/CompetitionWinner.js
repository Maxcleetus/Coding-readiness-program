import mongoose from 'mongoose';

const competitionWinnerSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'competition-winner',
      unique: true,
      trim: true,
    },
    name: { type: String, required: true, trim: true },
    imageData: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('CompetitionWinner', competitionWinnerSchema);

import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    challengeId: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
    },
    category: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    status: { type: String, default: 'Ready for Debugging', trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('Challenge', challengeSchema);

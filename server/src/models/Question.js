import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
    },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    snippet: { type: String, required: true, trim: true },
    link: {
      type: String,
      required: true,
      trim: true,
      default: 'https://leetcode.com/problemset/',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);

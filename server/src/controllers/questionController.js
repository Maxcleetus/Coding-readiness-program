import Question from '../models/Question.js';

export const getQuestions = async (req, res, next) => {
  try {
    const { search = '', category = '' } = req.query;

    const query = {};

    if (category) {
      query.category = { $regex: `^${category}$`, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const questions = await Question.find(query).sort({ questionId: 1 }).lean();
    return res.json(questions);
  } catch (error) {
    return next(error);
  }
};

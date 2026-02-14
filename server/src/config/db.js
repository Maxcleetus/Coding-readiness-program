import mongoose from 'mongoose';

let connectPromise;

export const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured. Add it in server/.env');
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectPromise) {
    connectPromise = mongoose.connect(mongoUri).then(() => {
      console.log('MongoDB connected');
    });
  }

  await connectPromise;
};

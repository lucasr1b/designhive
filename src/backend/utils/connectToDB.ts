import mongoose from 'mongoose';
import clientPromise from '../lib/db';

export const connectToDB = async () => {
  try {
    await clientPromise;
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI!);
      console.log('Connected to MongoDB');
    }
  } catch (err: any) {
    console.error('Error connecting to MongoDB:', err);
  }
};

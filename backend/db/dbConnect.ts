import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI as string)
      .then(() => console.log('MongoDB connected: ', process.env.MONGODB_URI));
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }
};

export default connectDB;

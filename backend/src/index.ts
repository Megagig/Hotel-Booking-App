import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from '../db/dbConnect';
import userRoutes from './routes/users.route';
import authRoutes from './routes/auth.route';

const app = express();

// Set up environment variables
const PORT = process.env.PORT || 7000;

// Database connection

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for the frontend URL
// This allows the frontend to make requests to the backend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

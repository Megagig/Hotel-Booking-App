import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from '../db/dbConnect';
import userRoutes from './routes/users.route';
import authRoutes from './routes/auth.route';
import path from 'path';

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
app.get('/', (req: Request, res: Response) => {
  res.send('API is running...');
});
// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Handle frontend routes - Add this before your static file serving
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

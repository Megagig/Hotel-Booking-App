import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../db/dbConnect';
import userRoutes from './routes/users.route';

const app = express();

// Set up environment variables
const PORT = process.env.PORT || 5000;

// Database connection

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/users', userRoutes);

//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

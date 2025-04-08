import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from '../db/dbConnect';

const app = express();

// Set up environment variables
const PORT = process.env.PORT || 5000;

// Database connection

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Test endpoint
app.get('/api/test', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello from the backend!' });
});

//Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

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

const frontendPath = path.join(__dirname, '../../../frontend/dist');

// Database connection

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for the frontend URL
// This allows the frontend to make requests to the backend
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );

const allowedOrigins = [
  'https://hotel-booking-app-06gf.onrender.com',
  'http://localhost:5173',
  'http://localhost:7000',
];

// Enable CORS for the frontend URL
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.static(frontendPath));

// Add a debug route
app.get('/', (req: Request, res: Response) => {
  console.log('Root route hit');
  console.log('Attempting to serve:', path.join(frontendPath, 'index.html'));
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Serve static files from the frontend build directory
// app.use(express.static(path.join(__dirname, '../../frontend/dist')));
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Catch-all route
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Static files being served from:', frontendPath);
});

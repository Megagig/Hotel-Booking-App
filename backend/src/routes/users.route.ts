import express from 'express';
import { registerUser } from '../controllers/user.controller';

// Create a new router instance
const router = express.Router();

// Define the routes for user-related operations
router.post('/register', registerUser);

export default router;

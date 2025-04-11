import express from 'express';
import { loginUser } from '../controllers/auth.controller';
import { check } from 'express-validator';

// Create a new router instance
const router = express.Router();
// Define the routes for user-related operations
router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password with six or more characters required').isLength(
      { min: 6 }
    ),
  ],

  loginUser
);

export default router;

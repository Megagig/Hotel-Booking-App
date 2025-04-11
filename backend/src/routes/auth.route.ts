import express from 'express';
import { loginUser } from '../controllers/auth.controller';
import { check } from 'express-validator';
import verifyToken from '../middleware/auth';
import { Request, Response } from 'express';

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

router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

export default router;

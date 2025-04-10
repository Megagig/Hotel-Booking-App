import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.status(400).json({
        message: 'User already exists',
      });
    }

    // Create a new user
    const user = new User(req.body);

    // Save the user to database
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1d' }
    );

    // Set token as HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000, // 1 day in milliseconds
    });

    // Return success response
    res.status(200).json({ userId: user._id });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

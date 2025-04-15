import { Request, Response } from 'express';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

//Register a new user
export async function registerUser(req: Request, res: Response) {
  // 1️⃣ Get validation errors from the request
  const errors = validationResult(req);

  // 2️⃣ If there are validation errors, return them to client
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array(),
    });
  }
  try {
    //destructuring the request body
    const { email, password, firstName, lastName } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.status(400).json({
        message: 'User already exists',
      });
    }

    // Create a new user instance and save it to the database
    const newUser = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
    //Modify the returned user object to exclude the password
    // newUser.password = undefined as any;
    const { password: savedPassword, ...others } = newUser.toObject();
    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1d' }
    );
    // Set token as HTTP-only cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000, // 1 day in milliseconds
    });

    //return the User
    res
      .status(201)
      .json({ message: 'User created successfully', user: others });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
}

import mongoose from 'mongoose';

// Define user type
export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Create user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

// Add password encryption middleware
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Password encryption code will be added here
  }
  next();
});

// Create and export the model
const User = mongoose.model<UserType>('User', userSchema);
export default User;

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define schema for User collection
const userSchema = new mongoose.Schema(
  {
    // Username must be unique and required
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
    },
    // Email must be valid, unique, and required
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, 'Please enter a valid email'],
    },
    // Password must be at least 6 characters long
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Pre-save hook to hash password before saving to DB
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is unchanged
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  next();
});

// Compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
export const User = mongoose.model('User', userSchema);

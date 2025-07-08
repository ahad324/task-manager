import { User } from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().trim().required().min(3),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }

    const { username, email, password } = value;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);

    res.status(201).json({ _id: user._id, username, email, token });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((err) => err.message),
      });
    }

    const { email, password } = value;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      res.json({ _id: user._id, username: user.username, email, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

// @desc Logout a user
// @route POST /api/auth/logout
// @access Public
export const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

// @desc Verify token
// @route GET /api/auth/verify
// @access Private
export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ _id: user._id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

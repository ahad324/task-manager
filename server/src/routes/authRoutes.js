import express from 'express';
import {
  register,
  login,
  logout,
  verifyToken,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for user logout (client-side token removal)
router.post('/logout', logout);

// Protected route to verify token validity and return user info
router.get('/verify', protect, verifyToken);

export default router;

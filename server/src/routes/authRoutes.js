import express from 'express';
import {
  register,
  login,
  logout,
  verifyToken,
} from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', protect, verifyToken);

export default router;

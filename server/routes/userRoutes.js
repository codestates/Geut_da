import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserImage,
  updateUserProfile,
  deleteUserInfo,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js'; // for private routes

const router = express.Router();

// endpoint => /api/users
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
  .delete(protect, deleteUserInfo);
router.route('/profile/image').patch(protect, updateUserImage);

export default router;

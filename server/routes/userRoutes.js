import express from 'express';
import {
  authUser,
  registerUser,
  // getUserProfile,
  checkUserPwd,
  updateUserImage,
  updateUserProfile,
  deleteUserInfo,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js'; // for private routes

const router = express.Router();

// endpoint => /api/users
router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/check').post(protect, checkUserPwd);
router.route('/image').patch(protect, updateUserImage);
router
  .route('/profile')
  // .get(protect, getUserProfile)
  .patch(protect, updateUserProfile)
  .delete(protect, deleteUserInfo);

export default router;

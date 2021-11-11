import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Content from '../models/content.js';
import generateToken from './utils/generateToken.js';

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, nickname } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error(`User already exists`);
  }

  const user = await User.create({
    email,
    password,
    nickname,
    image: `/images/user.jpeg`,
  });

  if (user) {
    res.status(201).json({
      message: 'ok',
    });
  } else {
    res.status(400);
    throw new Error('required element should be fullfilled');
  }
});

// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc   Check user password
// @route  POST /api/users/check
// @access Private
const checkUserPwd = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { password } = req.body;
  console.log('checkUserPwd 비밀번호가 노출된다!!', password);
  if (await user.matchPassword(password)) {
    res.json({ message: 'ok' });
  } else {
    res.status(401);
    throw new Error('Invalid password');
  }
});

// @desc   Update user image
// @route  PATCH /api/users/image
// @access Private
const updateUserImage = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  res.status(200).json({ image: updatedUser.image });
});

// @desc   Get user profile
// @route  GET /api/users/profile
// @access Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     res.json({
//       _id: user._id,
//       nickname: user.nickname,
//       email: user.email,
//       image: user.image,
//     });
//   } else {
//     res.status(404);
//     throw new Error('User not found');
//   }
// });

// @desc   Update user profile
// @route  PATCH /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// @desc   Delete user profile
// @route  DELETE /api/users/profile
// @access Private
const deleteUserInfo = asyncHandler(async (req, res) => {
  // 회원 탈퇴 요청

  await Content.deleteMany({ user: req.user._id }).populate('hashtag').exec();
  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({
    message: 'User Info deleted',
  });
});

export {
  registerUser,
  authUser,
  // getUserProfile,
  checkUserPwd,
  updateUserProfile,
  updateUserImage,
  deleteUserInfo,
};
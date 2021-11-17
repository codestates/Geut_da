import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Content from '../models/content.js';
import generateToken from './utils/generateToken.js';

// @desc   Check a email address
// @route  POST /api/users/email
// @access Public
const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(401).json({ message: 'Email already exists' });
  }
  res.status(200).send({ message: 'ok' });
});

// @desc   Check a nickname
// @route  POST /api/users/nickname
// @access Public
const checkNickname = asyncHandler(async (req, res) => {
  const { nickname } = req.body;

  const nameExists = await User.findOne({ nickname });

  if (nameExists) {
    res.status(401).json({ message: 'Nickname already exists' });
  }
  res.status(200).send({ message: 'ok' });
});

// @desc   Register a new user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, nickname } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401).json({ message: 'User already exists' });
  }

  const user = await User.create({
    email,
    password,
    nickname,
    image: '/images/user.jpeg',
  });

  if (user) {
    res.status(201).json({
      message: 'ok',
    });
  } else {
    res.status(400).json({ message: 'required element should be fullfilled' });
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
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// @desc   Check user password
// @route  POST /api/users/check
// @access Private
const checkUserPwd = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user._id);

  if (await user.matchPassword(password)) {
    res.json({ message: 'ok' });
  } else {
    res.status(401).json({ message: 'Invalid password' });
  }
});

// @desc   Update user image
// @route  PATCH /api/users/image
// @access Private
const updateUserImage = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  }); // Update를 실행한 뒤의 정보를 받고 싶다면 new 옵션을 사용해야 한다.
  res.status(200).json({ image: updatedUser.image });
});

// @desc   Update user profile
// @route  PATCH /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // 닉네임과 비밀번호 변경

  let message = '';

  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 10);
  } // 비밀번호 들어오면 해시해주고 넣기

  if (req.body.nickname && req.body.password) {
    message = '모두 성공적으로 변경되었습니다';
  } else {
    if (req.body.nickname) {
      message = '닉네임이 성공적으로 변경되었습니다';
    } else {
      message = '비밀번호가 성공적으로 변경되었습니다';
    }
  }
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
  });

  res.status(200).json({
    message,
    nickname: updatedUser.nickname,
    token: generateToken(updatedUser._id),
  });
});

// @desc   Delete user profile
// @route  DELETE /api/users/profile
// @access Private
const deleteUserInfo = asyncHandler(async (req, res) => {
  // 회원 탈퇴 요청

  await Content.deleteMany({ user: req.user._id });
  await User.findByIdAndDelete(req.user._id);

  res.status(200).json({
    message: 'User Info deleted',
  });
});

export {
  checkEmail,
  checkNickname,
  registerUser,
  authUser,
  checkUserPwd,
  updateUserProfile,
  updateUserImage,
  deleteUserInfo,
};

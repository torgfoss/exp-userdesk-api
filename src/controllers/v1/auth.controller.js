import asyncHandler from 'express-async-handler';
import {
  registerUserService,
  loginUserService,
} from '../../services/auth.service.js';

// @desc    Create a user
// @route   POST /api/v1/auth/register
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  const { token, userData } = await registerUserService({
    fullName,
    username,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: 'User successfully created',
    token,
    data: userData,
  });
});

// @desc    Login a user
// @route   POST /api/v1/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { token, userData } = await loginUserService({ email, password });

  res.status(200).json({
    success: true,
    message: 'User successfully logged in',
    token,
    data: userData,
  });
});

export { createUser, loginUser };

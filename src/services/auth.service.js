import User from '../models/user.model.js';
import ApiError from '../utils/errors/ApiError.js';
import generateToken from '../utils/generateToken.js';
import hashPassword from '../utils/hashPassword.js';
import validatePassword from '../utils/validatePassword.js';

const registerUserService = async ({ fullName, username, email, password }) => {
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    throw new ApiError(400, 'Email already registered');
  }

  // Encrypt password
  const hashedPassword = await hashPassword(password);

  // Create user
  const createdUser = await User.create({
    fullName,
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
  });

  if (!createdUser) {
    throw new ApiError(400, 'User unsuccessfully created');
  }

  // Create token
  const token = generateToken(createdUser._id);

  const { password: _, ...userData } = createdUser.toObject();

  return { token, userData };
};

const loginUserService = async ({ email, password }) => {
  // Normalize email
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // Validate password
  const hashedPassword = user.password;
  const isValidPassword = await validatePassword(password, hashedPassword);

  if (!isValidPassword) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Create token
  const token = generateToken(user._id);

  const { password: _, ...userData } = user.toObject();

  return { token, userData };
};

export { registerUserService, loginUserService };

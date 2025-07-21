import jwt from 'jsonwebtoken';
import User from '../../models/user.model.js';
import ApiError from '../../utils/errors/ApiError.js';
import { JWT_SECRET } from '../../config/index.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      // Fetch user
      const user = await User.findById(decoded._id).select('-password');

      if (!user) {
        throw new ApiError(404, 'User not found');
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ApiError(401, 'Token expired. Please log in again');
      }

      throw new ApiError(401, 'Invalid token. Not authorized');
    }
  } else {
    throw new ApiError(401, 'Token not available. Not authorized');
  }
};

export default protect;

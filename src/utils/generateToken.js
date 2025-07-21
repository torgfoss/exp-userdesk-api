import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const generateToken = (userId) => {
  return jwt.sign({ _id: userId }, JWT_SECRET, {
    expiresIn: '7d',
  });
};

export default generateToken;

import express from 'express';
import { createUser, loginUser } from '../../controllers/v1/auth.controller.js';
import {
  registerValidation,
  loginValidation,
} from '../../middlewares/validators/auth.validator.js';
import runValidators from '../../middlewares/validators/run.validator.js';

const router = express.Router();

// Routes
router.route('/register').post(registerValidation, runValidators, createUser);
router.route('/login').post(loginValidation, runValidators, loginUser);

export default router;

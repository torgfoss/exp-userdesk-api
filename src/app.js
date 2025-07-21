import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { NODE_ENV } from './config/index.js';
import authRoutesV1 from './routes/v1/auth.route.js';
import userRoutesV1 from './routes/v1/user.route.js';
import errorHandler from './middlewares/error-handlers/error.middleware.js';
import connectDB from './config/db.js';

connectDB();

const app = express();

// Global middlewares
app.use(cors());
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes middlewares
app.use('/api/v1/auth', authRoutesV1);
app.use('/api/v1/users', userRoutesV1);

// Global error handler
app.use(errorHandler);

export default app;

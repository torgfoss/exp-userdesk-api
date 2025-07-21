import mongoose from 'mongoose';
import colors from 'colors';
import { MONGO_URI } from './index.js';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);

    // Log connection status
    console.log(`MongoDB connected: ${conn.connection.host}`.underline.cyan);
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;

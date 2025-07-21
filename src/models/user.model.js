import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please full name is required'],
      trim: true,
    },
    username: {
      type: String,
      required: [true, 'Please username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please password is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;

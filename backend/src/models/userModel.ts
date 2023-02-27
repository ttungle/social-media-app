import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  passwordChangeAt: Date;
  passwordResetToken: string;
  passwordResetExpires: string;
  profilePicture: string;
  coverPicture: string;
  followers: any;
  followings: any;
  isAdmin: boolean;
  active: boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, 'Please provide your username.'],
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email.'],
      lowercase: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      min: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password.'],
      validate: {
        validator: function (el: string): boolean {
          const user = this as any;
          return el === user.password;
        },
      },
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicture: {
      type: String,
      default: '',
    },
    coverPicture: {
      type: String,
      default: '',
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;

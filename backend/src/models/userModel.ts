import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface LocationData {
  type: string;
  coordinates: number[];
  address?: string;
  description?: string;
}

export interface UserDocument extends Document {
  username: string;
  email: string;
  name: string;
  password: string | undefined;
  passwordConfirm: string | undefined;
  passwordChangeAt: Date | number | string;
  passwordResetToken: string;
  passwordResetExpires: string;
  profilePicture: string;
  coverPicture: string;
  followers: any;
  followings: any;
  role: 'admin' | 'user';
  active: boolean;
  bio: string;
  work: string;
  city: string;
  from: string;
  location: LocationData;
  relationship: 'single' | 'in relationship' | 'married';
  checkPassword: (inputPassword: string, encryptedPassword: string) => boolean;
  passwordChangeAfter: (jwtCreatedAt: Date) => boolean;
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
        message: 'Password are not the same.',
      },
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePicture: {
      type: String,
      default: '/image/users/default.jpeg',
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
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    bio: {
      type: String,
      max: 128,
    },
    work: {
      type: String,
      max: 128,
    },
    city: {
      type: String,
      max: 64,
    },
    from: {
      type: String,
      max: 64,
    },
    location: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
      address: String,
      description: String,
    },
    relationship: {
      type: String,
      enum: ['single', 'in relationship', 'married'],
    },
  },
  { timestamps: true }
);

userSchema.index({ location: '2dsphere' });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  if (typeof this?.password === 'string' && this?.password.length > 0)
    this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, async function (next) {
  this.select(['-passwordChangeAt', '-updatedAt', '-__v']);
  next();
});

userSchema.methods.checkPassword = async function (inputPassword, encryptedPassword) {
  return await bcrypt.compare(inputPassword, encryptedPassword);
};

userSchema.methods.passwordChangeAfter = function (jwtCreatedAt) {
  if (this?.passwordChangeAt) {
    const dateTimestamp = parseInt(this.passwordChangeAt.getTime(), 10) / 1000;
    return dateTimestamp > jwtCreatedAt;
  }

  return false;
};

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;

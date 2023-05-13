import mongoose, { Document } from 'mongoose';
import { UserDocument } from './userModel';

export interface PostDocument extends Document {
  author: UserDocument;
  description: string;
  images: Array<string>;
  likes: any;
  privacy: 'public' | 'friends' | 'onlyMe';
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      max: 1500,
    },
    images: {
      type: [String],
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    privacy: {
      type: String,
      enum: ['public', 'friends', 'onlyMe'],
      default: 'public',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, async function (next) {
  this.sort('-createdAt').populate({ path: 'author', select: ['-followers', '-followings', '-role', '-createdAt'] });
  next();
});

const Post = mongoose.model<PostDocument>('Post', postSchema);

export default Post;

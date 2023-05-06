import mongoose, { Document } from 'mongoose';

export interface PostDocument extends Document {
  userId: string;
  description: string;
  images: Array<string>;
  likes: any;
  privacy: 'public' | 'friends' | 'onlyMe';
}

const postSchema = new mongoose.Schema<PostDocument>(
  {
    userId: {
      type: String,
      require: [true, 'Please provide userId.'],
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
      default: 'public'
    }
  },
  { timestamps: true }
);

postSchema.pre(/^find/, async function(next) {
  this.sort("-createdAt");
  next();
});

const Post = mongoose.model<PostDocument>('Post', postSchema);

export default Post;

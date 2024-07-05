import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface IPost extends Document {
  authorId: ObjectId;
  type: string;
  content?: string;
  designFile?: string;
  likeCount: number;
  replyCount: number;
  likes: ObjectId[];
}

const PostSchema: Schema<IPost> = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  designFile: {
    type: String
  },
  likeCount: {
    type: Number,
    default: 0
  },
  replyCount: {
    type: Number,
    default: 0
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true,
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;

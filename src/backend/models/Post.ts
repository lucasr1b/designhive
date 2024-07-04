import mongoose, { Document, ObjectId, Schema } from 'mongoose';

interface IPost extends Document {
  authorId: ObjectId;
  type: string;
  content: string;
  likeCount: number;
  replyCount: number;
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
    required: true
  },
  likeCount: {
    type: Number,
    default: 0
  },
  replyCount: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true,
});

const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;

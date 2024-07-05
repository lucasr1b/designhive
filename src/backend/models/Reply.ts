import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IReply extends Document {
  postId: ObjectId;
  authorId: ObjectId;
  content: string;
  likeCount: number;
  likes: ObjectId[];
}

const ReplySchema: Schema<IReply> = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  timestamps: true,
});

const Reply = mongoose.models.Reply || mongoose.model<IReply>('Reply', ReplySchema, 'replies');

export default Reply;
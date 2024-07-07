import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface INotification extends Document {
  userId: ObjectId;
  type: 'follow' | 'like_post' | 'like_reply' | 'reply';
  actorId: ObjectId;
  postId?: ObjectId;
  replyId?: ObjectId;
  read: boolean;
}

const NotificationSchema: Schema<INotification> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['follow', 'like_post', 'like_reply', 'reply'],
    required: true
  },
  actorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  replyId: {
    type: Schema.Types.ObjectId,
    ref: 'Reply'
  },
  read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
});

const Notification = mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;
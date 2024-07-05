import { format, formatDistanceToNow } from 'date-fns';

export const formatPostDate = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, includeSeconds: true, });
};

export const formatFullPostDate = (date: Date) => {
  return format(date, "h:mm a · MMM d, yyyy");
};
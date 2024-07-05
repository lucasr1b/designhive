import { formatDistanceToNow } from 'date-fns';

export const formatPostDate = (date: Date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, includeSeconds: true, });
};

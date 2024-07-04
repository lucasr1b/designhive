import User from '../backend/models/User';

const generateUsername = async (email: string) => {
  const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  let username = baseUsername;
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = `${baseUsername}${counter}`;
      counter++;
    } else {
      isUnique = true;
    }
  }

  return username;
};

export default generateUsername;

'use server';
import { getSessionWithMethods } from '@/utils/session';
import User from '../backend/models/User';
import { connectToDB } from '../backend/utils/connectToDB';
import generateUsername from '../utils/generateUsername';

export const signup = async (formData: FormData) => {
  await connectToDB();
  const session = await getSessionWithMethods();

  const { fname, email, password, cpassword } = Object.fromEntries(formData);

  const formName = fname as string;
  const formEmail = email as string;
  const formPassword = password as string;
  const formCPassword = cpassword as string;

  if (await User.exists({ formEmail })) {
    throw new Error('User already exists');
  };

  if (formPassword !== formCPassword) {
    throw new Error('Passwords do not match');
  };

  const username = await generateUsername(formEmail);

  const user = await User.create({
    name: formName,
    email: formEmail,
    username,
    password: formPassword
  });

  session._id = user._id;
  session.name = user.name;
  session.email = user.email;
  session.username = user.username;
  session.pfp = user.pfp;
  session.isLoggedIn = true;
  await session.save();

  return session;
}
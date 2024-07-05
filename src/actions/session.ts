'use server';
import { getSessionWithMethods } from '@/utils/session';
import User from '../backend/models/User';
import generateUsername from '../utils/generateUsername';
import { connectToDB } from '@/backend/utils/connectToDB';

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

  session._id = user._id.toString();
  session.name = user.name;
  session.email = user.email;
  session.username = user.username;
  session.pfp = user.pfp;
  session.isLoggedIn = true;
  await session.save();

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    username: user.username,
    pfp: user.pfp,
    isLoggedIn: true,
  };
}

export const login = async (formData: FormData) => {
  await connectToDB();
  const session = await getSessionWithMethods();

  const { username, password } = Object.fromEntries(formData);

  const formUsername = username as string;
  const formPassword = password as string;

  const user = await User.findOne({
    $or: [{ email: formUsername }, { username: formUsername }]
  });

  if (!user || !(await user.comparePassword(formPassword))) {
    throw new Error('Email/username or password is incorrect');
  };

  session._id = user._id.toString();
  session.name = user.name;
  session.email = user.email;
  session.username = user.username;
  session.pfp = user.pfp;
  session.isLoggedIn = true;
  await session.save();

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    username: user.username,
    pfp: user.pfp,
    isLoggedIn: true,
  };
};

export const logout = async () => {
  const session = await getSessionWithMethods();

  session.isLoggedIn = false;
  await session.save();
}
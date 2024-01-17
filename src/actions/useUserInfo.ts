'use server';

import { authOptions } from '@/lib/auth/authOptions';
import prisma from '@/lib/prisma/prisma';
import { getServerSession } from 'next-auth';

export const getUserInfo = async () => {
  // const session = await getServerSession(authOptions);
  // const id = session?.user.id;
  const user = await prisma.user.findMany();
  // if (id) {
  //   return { ...session.user };
  // } else {
  //   return null;
  // }
  if (user !== null) {
    return user;
  } else {
    return null;
  }
};

export type UserInfo = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
};

export type SetUserInfo = {
  name: string;
  email: string;
  emailVerified: Date;
};

export const setUserInfo = async ({ name, email, emailVerified }: SetUserInfo) => {
  await prisma.user.create({
    data: {
      name,
      email,
      emailVerified,
    },
  });
  return { name, email, emailVerified };
};

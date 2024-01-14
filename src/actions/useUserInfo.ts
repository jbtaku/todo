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

export const setUserInfo = async () => {
  const uuid = crypto.randomUUID();
  try {
    await prisma.user.create({
      data: {
        name: `test_wada_${uuid}`,
        email: `test_wada_${uuid}@gmail.com`,
        emailVerified: new Date(),
      },
    });
  } catch (err) {
    console.log(err);
  }
};

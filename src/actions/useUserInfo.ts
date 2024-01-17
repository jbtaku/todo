'use server';

import prisma from '@/lib/prisma/prisma';

/** ユーザー情報 */
export type UserInfo = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
};

/**
 * Server Actions
 *
 * ユーザー情報一覧を取得する
 */
export const getUserInfo = async () => {
  const user = await prisma.user.findMany();
  if (user !== null) {
    return user;
  } else {
    return null;
  }
};

/** ユーザー登録情報 */
export type SetUserInfo = {
  name: string;
  email: string;
  emailVerified: Date;
};

/**
 * Server Actions
 *
 * ユーザー情報を登録する
 */
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

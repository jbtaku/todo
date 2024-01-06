"use server";

import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

export const getUserInfo = async () => {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  if (id) {
    return { ...session.user };
  } else {
    return null;
  }
};

export const testISR = async () => {
  revalidateTag("test");
};

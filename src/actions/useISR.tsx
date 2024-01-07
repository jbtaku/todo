"use server";

import { revalidateTag } from "next/cache";

export const todoISR = async () => {
  revalidateTag("todo");
};

export const todo2ISR = async () => {
  revalidateTag("todo2");
};

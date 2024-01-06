"use server";

import prisma from "@/lib/prisma/prisma";
import { inputType } from "@/types/todo";
import { revalidatePath } from "next/cache";

export const getTodo = async () => {
  const todoList = await prisma.todo.findMany();
  console.log(todoList);
  return todoList;
};

export const postTodo = async (data: inputType) => {
  await prisma.todo.create({ data });
  revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
};

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({ where: { id } });
  revalidatePath(`${process.env.NEXT_PUBLIC_BASE_URL}/`)
};

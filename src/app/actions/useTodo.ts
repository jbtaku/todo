"use server";

import prisma from "@/lib/prisma/prisma";
import { inputType } from "@/types/todo";

export const postTodo = async (data: inputType) => {
  await prisma.todo.create({ data });
};

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({ where: { id } });
};

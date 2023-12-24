import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";
import { todo } from "node:test";

export const GET = async () => {
  const todoList = await prisma.todo.findMany();
  return NextResponse.json(todoList);
};

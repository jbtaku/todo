import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";


export const GET = async () => {
  const todoList = await prisma.todo.findMany();
  return NextResponse.json(todoList);
};

import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const todoList = await prisma.todo.findMany();
  return NextResponse.json(todoList);
};

import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const images = await prisma.image.findMany();
  return NextResponse.json(images);
};

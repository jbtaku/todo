import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const videos = await prisma.video.findMany();
  return NextResponse.json(videos);
};

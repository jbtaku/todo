"use server";

import prisma from "@/lib/prisma/prisma";

export const postImage = async (src: string) => {
  await prisma.image.create({ data: { src } });
};

export const postVideo = async (src: string) => {
    await prisma.video.create({ data: { src } });
  };
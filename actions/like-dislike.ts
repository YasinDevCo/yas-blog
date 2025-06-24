"use server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import { z } from "zod";
export const likeDisLikeToggle = async (articleId: string) => {
  console.log("like operation ........")
  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login first"],
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("User does not exist in the database");
  }

  const existingLike = await prisma.like.findFirst({
    where: { articleId, userId: user.id },
  });
  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: {
        articleId,
        userId: user.id,
      },
    });
  }

  revalidatePath(`/articles/${articleId}`);
};

"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const editArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type EditeArticleFormstate = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const editArticle = async (
  articleId: string,
  prevState: EditeArticleFormstate,
  formData: FormData
): Promise<EditeArticleFormstate> => {
  const result = editArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    return {
      errors: {
        title: fieldErrors.title,
        category: fieldErrors.category,
        content: fieldErrors.content ?? [],
        featuredImage: [],
        formErrors: [],
      },
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login"],
        content: [],
      },
    };
  }

  const existingArticle = await prisma.article.findUnique({
    where: { id: articleId },
  });

  if (!existingArticle) {
    return {
      errors: {
        formErrors: ["Article not found."],
        content: [],
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!existingUser || existingArticle.authorId !== existingUser.id) {
    return {
      errors: {
        formErrors: ["User not authorized to edit this article."],
        content: [],
      },
    };
  }

  let imageUrl = existingArticle.featureImage;
  const imageFile = formData.get("featuredImage") as File | null;

  if (imageFile && imageFile.size > 0) {
    try {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse: UploadApiResponse | undefined = await new Promise(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(buffer);
        }
      );

      if (uploadResponse?.secure_url) {
        imageUrl = uploadResponse.secure_url;
      } else {
        return {
          errors: {
            featuredImage: ["Failed to upload image. Please try again."],
            content: [],
          },
        };
      }
    } catch (error) {
      return {
        errors: {
          formErrors: ["Error uploading image. Please try again." + error],
          content: [],
        },
      };
    }
  }

  try {
    await prisma.article.update({
      where: { id: articleId },
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featureImage: imageUrl,
        authorId: existingUser.id,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          formErrors: [error.message],
          content: [],
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occurred."],
          content: [],
        },
      };
    }
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};

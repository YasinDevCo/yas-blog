"use server";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

cloudinary.config({
  cloud_name: process.env.CLOUDINAY_CLOUD_NAME,
  api_key: process.env.CLOUDINAY_API_KEY,
  api_secret: process.env.CLOUDINAY_API_SECRET,
});

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type CreateArticleFormstate = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content: string[];
    formErrors?: string[];
  };
};

export const createArticle = async (
  prevState: CreateArticleFormstate,
  formData: FormData
): Promise<CreateArticleFormstate> => {
  const result = createArticleSchema.safeParse({
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
      featuredImage: [],  // چون توی schema نیست، باید اینجا مقدار بدی
      // formErrors اینجا نیست، پس اگر میخوای مقدار بدی:
      formErrors: [], // یا حذفش کن اگر لازم نیست
    },
  };
}


  const { userId } = await auth();
  if (!userId) {
    return {
      errors: {
        formErrors: ["You have to login"],
        content: [], // تضمین مقدار content
      },
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!existingUser) {
    return {
      errors: {
        formErrors: [
          "User not found. Please register before createing an article",
        ],
        content: [], // تضمین مقدار content
      },
    };
  }
  const imageFile = formData.get("featuredImage") as File | null;
  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: {
        featuredImage: ["image file is required"],
        content: [], // تضمین مقدار content
      },
    };
  }

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

  const imageUrl = uploadResponse?.secure_url;

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Failed to upload image. Please try again"],
        content: [], // تضمین مقدار content
      },
    };
  }
  try {
    await prisma.article.create({
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
          content: [], // تضمین مقدار content
        },
      };
    } else {
      return {
        errors: {
          formErrors: ["Some internal server error occurred."],
          content: [], // تضمین مقدار content
        },
      };
    }
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
};

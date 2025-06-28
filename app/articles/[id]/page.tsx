import ArticleDetailPage from "@/components/article/article-detail-page";
import { prisma } from "@/lib/prisma";
import React from "react";
import Navbar from "@/components/home/header/Navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type ArticleDetailPageProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticleDetailPageProps> = async ({ params }) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/?error=unauthenticated");
  }
  const id = (await params).id;
  const article = await prisma.article.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  if (!article) {
    return <h1>Article not found.</h1>;
  }
  return (
    <div>
      <Navbar />

      <ArticleDetailPage article={article} />
    </div>
  );
};

export default page;

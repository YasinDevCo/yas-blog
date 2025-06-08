import EditArticlesPage from "@/components/article/edit-articles-page";
import { prisma } from "@/lib/prisma";
import React from "react";

type EditArticlesParams = {
  params: Promise<{ id: string }>;
};

const page: React.FC<EditArticlesParams> = async ({ params }) => {
  const id = (await params).id;
  const article = await prisma.article.findUnique({
    where: { id },
  });
  if (!article) return <h1>Article not found for this {id}</h1>;
  return (
    <div>
      <EditArticlesPage article={article} />
    </div>
  );
};

export default page;

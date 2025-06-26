import { prisma } from "../prisma";

export const fetchArticleByQuery = async (searchText: string) => {
  return prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: searchText, mode: "insensitive" } },
        { category: { contains: searchText, mode: "insensitive" } },
      ],
    },
    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
          email: true,
        },
      },
    },
  });
};

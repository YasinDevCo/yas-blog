import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Search } from "lucide-react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

type AllArticlePageProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const AllArticlePage: React.FC<AllArticlePageProps> = async ({ article }) => {
  if (article.length <= 0) {
    return <NoSearchResults />;
  }
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {article.map((item) => (
        <Card
          key={item.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )}
        >
          <div className="p-6">
            <Link href={`/articles/${item.id}`}>
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  sizes="fill"
                  alt="article"
                  src={item.featureImage}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage
                    className="rounded-full"
                    src={item.author.imageUrl || ""}
                  />
                  <AvatarFallback>
                    {item.author.name
                      ? item.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()
                      : "NA"}
                  </AvatarFallback>
                </Avatar>

                <span>{item.author.name}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p
                className="mt2
             text-gray-600 dark:text-gray-300"
              >
                {item.category}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{item.createdAt.toDateString()}</span>
                <span>{12} min to read</span>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AllArticlePage;

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>

      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}

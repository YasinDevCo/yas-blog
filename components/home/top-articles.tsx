import React from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/lib/prisma";

const TopArticles = async () => {
  const article = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {article.slice(0, 3).map((item) => (
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

export default TopArticles;

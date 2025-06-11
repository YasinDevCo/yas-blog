"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Prisma } from "@prisma/client";
import CommentList from "../comments/comment-list";
import LikeButton from "./like-button";
import CommentInput from "../comments/comment-input";
import Image from "next/image";

type ArticleDetailPageProps = {
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
  }>;
};

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl || ""} />
                <AvatarFallback>
                  {article.author.name
                    ? article.author.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                    : "AU"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-sm">
                  {article.createdAt.toDateString()} · 12 min read
                </p>
              </div>
            </div>
          </header>
          {/* ✅ تصویر بالای مقاله */}
          <div className="relative w-full h-[300px] mb-8 rounded-lg overflow-hidden">
            <Image
              alt="article"
              src={article.featureImage}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12 text-justify"
            dangerouslySetInnerHTML={{
              __html:
                "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis asperiores cumque provident odit! Officia veniam aspernatur, quia, ab ad eius reuod reprehenderit numquam labore voluptatum exercitationem enim quos perferendis esse ea eos vitae excepturi? Similique, lecusandae eligendi? Ratione et saepe tempore aperiam impedit cupiditate nin soluta enim nam eos, dolor nemo id cupiditate iste dolore beatae atque! Atque tempore rem id harum aspernatur, porro animi fuga doloribus autem nobis repudiandae assumenda ex suscipit, aliquam nulla excepturi quos et at? Dolore temporibus quo laborum, ad quod nihil consequatur ut facilis assumenda sequi accusantium officiis sit pariatur adipisci minus animi vero tempora illum earum quasi placeat fugiat ipsum! Ab explicabo nisi ut consectetur saepe sit iste aspernatur ad illum placeat praesentium quasi provident sed dolorem necessitatibus, ipsa rem quod quidem dolor porro repellat alias delectus magnam molestiae. Quidem labore voluptatum dignissimos saepe soluta quia eius rem aliquid velit architecto ipsam pariatur amet iste, repudiandae tempora rerum at vitae quae, illo minima? Quaerat asperiores enim qui adipisci exercitationem temporibus repellendus quo et impedit veniam, ut laborum distinctio repudiandae? Odit alias facilis nulla quidem laudantium dolor enim corporis, doloribus ipsam vitae. Cum iste eveniet totam, impedit eligendi sint cupiditate illo itaque assumenda! Similique aliquid illum qui veritatis sapiente dignissimos sint eius et culpa, debitis distinctio molestiae consequuntur sed, impedit amet perferendis neque ullam. At veritatis sunt eius aut nemo rem, ipsum est voluptatum fuga possimus ex error debitis repellat qui id pariatur laudantium enim? Officiis, in. Itaque cum ex amet consequatur, est accusantium magnam asperiores molestias placeat, molestiae dolorem sint libero unde voluptas pariatur praesentium! Ut consequuntur recusandae ullam fugiat omnis quos autem corrupti? Voluptatibus quis doloribus similique sequi nam praesentium illo inventore, maiores consequatur rem, ex explicabo! Optio, alias nam et in quibusdam exercitationem architecto consectetur suscipit expedita dolores aliquid possimus illum, dolore, amet sunt culpa voluptatum quaerat. Quaerat earum quasi debitis. Sint ullam ipsa error cumque, placeat ducimus ea iure asperiores. Minus fugiat architecto odit expedita rem voluptatibus maiores consequatur nesciunt aspernatur tenetur nam dignissimos ex animi deserunt, repudiandae numquam. Unde perspiciatis in deserunt, accusamus ullam architecto facere excepturi velit! Perferendis nemo odio sapiente ipsam eos, sint beatae quae explicabo ratione voluptatem vitae aut! Tenetur est quasi dignissimos porro facere, ipsam eligendi. Consectetur voluptate similique ducimus neque numquam vitae ipsam quaerat? Voluptas exercitationem, doloremque provident possimus eos beatae dolorum pariatur, praesentium inventore repellat non ut et omnis ullam fugiat tenetur vel! Adipisci dolor, deleniti quas aut aliquam cumque corporis unde neque cupiditate, expedita voluptates officia minus sed fugit maxime quisquam dolores similique nulla. Voluptatem, labore? Nisi suscipit at rem? Pariatur alias consectetur facere consequatur impedit, possimus dignissimos ea velit cupiditate odit quae accusantium molestias nihil, quaerat repellendus inventore voluptatibus tempora? Minus dolor quae unde illum harum? Tempora voluptate dolores minus possimus illum hic expedita saepe doloremque corrupti aperiam veniam eveniet consectetur, minima impedit reprehenderit eos ratione ducimus itaque excepturi? Necessitatibus sit a labore vel cum. Sint aliquam quia optio similique architecto?</p>",
            }}
          />
          {/* Article Actions */}
          <LikeButton />

          {/* Comments Section */}
          <CommentInput />
          <CommentList />
        </article>
      </main>
    </div>
  );
}

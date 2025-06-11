"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Prisma } from "@prisma/client";

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
      {/* Reuse your existing Navbar */}

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

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{
              __html:
                "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ducimus cumque facere sunt suscipit voluptatibus! Similique sit dolores cupiditate nesciunt repellendus. Similique animi quod laboriosam facilis consequatur qui debitis quibusdam officia. Odit adipisci voluptatibus obcaecati praesentium, quae, exercitationem, iure illo nisi error voluptatem earum! Sed animi tenetur quod dolores quaerat incidunt porro, temporibus sequi magni at possimus illum nisi, quidem velit consequatur ratione quam. Libero reprehenderit quaerat et expedita harum placeat, odit quas cupiditate tenetur dolore recusandae voluptatem esse distinctio nisi, excepturi assumenda nemo autem. Quaerat magnam accusantium laborum non modi tempora numquam nostrum, labore architecto repudiandae maiores! Culpa, repudiandae.</p>",
            }}
          />
          {/* Article Actions */}
          {/* <LikeButton articleId={article.id} likes={likes} isLiked = {isLiked}/> */}

          {/* Comments Section */}
          {/* <Card className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {comments.length} Comments
              </h2>
            </div>
            <CommentForm articleId={article.id} />
            <CommentList comments={comments} />
          </Card> */}
        </article>
      </main>
    </div>
  );
}

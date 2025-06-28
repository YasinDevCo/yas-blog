import AllArticlePage from "@/components/article/all-article-page";
import ArticleSearchInput from "@/components/article/article-search-input";
import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import AllArticlesPageSkeleton from "@/components/article/all-articles-page-skeleton";
import { fetchArticleByQuery } from "@/lib/query/fetch-article-by-query";
import Link from "next/link";

type SearchPageProps = {
  searchParams: Promise<{ search?: string; page: string }>;
};

const ITEMS_PER_PAGE = 3;

const page: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const searchText = (await searchParams).search || "";
  const currentPage = Number((await searchParams).page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;
  const take = ITEMS_PER_PAGE;
  const { article, total } = await fetchArticleByQuery(searchText, skip, take);
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  return (
    <>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-12 space-y-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              All Articles
            </h1>
            <ArticleSearchInput />
          </div>
          <Suspense fallback={<AllArticlesPageSkeleton />}>
            <AllArticlePage article={article} />
          </Suspense>

          <div className="flex mt-12 justify-center gap-2">
            <Link
              href={`?search=${searchText}&page=${currentPage - 1}`}
              passHref
            >
              <Button
                disabled={currentPage === 1}
                variant={"ghost"}
                size={"sm"}
              >
                &#x2190; Prev
              </Button>
            </Link>

            {Array.from({ length: totalPages }).map((_, index) => (
              <Link
                key={index}
                href={`?search=${searchText}&page=${index + 1}`}
              >
                <Button
                  variant={`${
                    currentPage === index + 1 ? "destructive" : "ghost"
                  }`}
                  size={"sm"}
                >
                  {index + 1}
                </Button>
              </Link>
            ))}

            <Link
              href={`?search=${searchText}&page=${currentPage + 1}`}
              passHref
            >
              <Button
                disabled={currentPage === totalPages}
                variant={"ghost"}
                size={"sm"}
              >
                Next &#x2192;
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};

export default page;

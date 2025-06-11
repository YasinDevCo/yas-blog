import AllArticlePage from "@/components/article/all-article-page";
import ArticleSearchInput from "@/components/article/article-search-input";
import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          <ArticleSearchInput />
        </div>


        <AllArticlePage/>



        <div className="flex mt-12 justify-center gap-2">
          <Button variant={"ghost"} size={"sm"}>
            &#x2190; Prev
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            1
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            2
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            3
          </Button>
          <Button variant={"ghost"} size={"sm"}>
           Next  &#x2192; 
          </Button>
        </div>
      </main>
    </div>
  );
};

export default page;

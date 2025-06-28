"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import Link from "next/link";

type RecentArticlesProps = {
  article: {
    id: string;
    title: string;
    comments: { id: string }[];
    createdAt: Date;
  }[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ article }) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button>View All →</Button>
        </div>
      </CardHeader>
      {!article.length ? (
        <CardContent>No article found</CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {article.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>

                  <TableCell>
                    <Badge
                      variant={"secondary"}
                      className="rounded-full bg-green-100 text-green-800"
                    >
                      Published
                    </Badge>
                  </TableCell>

                  <TableCell>{item?.comments?.length}</TableCell>

                  <TableCell>{new Date(item.createdAt).toDateString()}</TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/articles/${item.id}/edit`}>
                        <Button variant={"ghost"} size={"sm"}>
                          Edit
                        </Button>
                      </Link>
                      <DeleteButton articleId={item.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;

type DeleteButtonProps = {
  articleId: string;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ articleId }) => {
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    // فرض می‌کنیم یک API route برای حذف دارید، مثلا /api/articles/delete
    await fetch("/api/articles/delete", {
      method: "POST",
      body: JSON.stringify({ id: articleId }),
      headers: { "Content-Type": "application/json" },
    });
    // اینجا باید رفرش صفحه یا ریفچ داده انجام دهید
  }

  return (
    <Button
      disabled={isPending}
      variant={"ghost"}
      size={"sm"}
      onClick={() => {
        startTransition(() => {
          handleDelete();
        });
      }}
    >
      {isPending ? "Loading..." : "Delete"}
    </Button>
  );
};

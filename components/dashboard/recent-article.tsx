import React from "react";
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
import { Prisma } from "@prisma/client";

type RecentArticlesProps = {
  article: Prisma.ArticleGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          email: true;
          name: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

const RecentArticles: React.FC<RecentArticlesProps> = ({ article }) => {
  return (
    <>
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

                    <TableCell>{item.createdAt.toDateString()}</TableCell>

                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/dashboard/articles/${item.id}/edit`}>
                          <Button variant={"ghost"} size={"sm"} className="">
                            Edit
                          </Button>
                        </Link>
                        <DeleteButton />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default RecentArticles;

const DeleteButton = () => {
  return (
    <form action="">
      <Button variant={"ghost"} size={"sm"} type="submit">
        Delete
      </Button>
    </form>
  );
};

"use client";
import React, {
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createArticle } from "@/actions/create-article";
import dynamic from "next/dynamic";
const SimpleEditor = dynamic(() => import("./TiptapEditor"), { ssr: false });

const CreateArticlesPage = () => {
  const [content, setContent] = useState<string>("");
 const [formState, action, isPending] = useActionState(createArticle, {
  errors: {
    title: [],
    category: [],
    featuredImage: [],
    content: [],
    formErrors: [],
  },
});

  const handleEditorChange = (data: string) => {
    setContent(data);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append("content", content);
    startTransition(() => {
      action(formData);
    });
  };
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                placeholder="Enter a article title"
              />
              {formState.errors.title && (
                <span className="text-red-600 text-sm">
                  {formState.errors.title}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select name="category" className="flex h-10 w-full rounded-md">
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web development</option>
              </select>
              {formState.errors.category && (
                <span className="text-red-600 text-sm">
                  {formState.errors.category}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Featured image</Label>
              <Input
                type="file"
                name="featuredImage"
                id="featuredImage"
                accept="image/*"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="featuredImage">Content</Label>
              {/* 👇 این خط جدید اضافه کن */}
              <input type="hidden" name="content" value={content} />
              <SimpleEditor onChange={handleEditorChange} />
              {formState.errors.content && (
                <span className="text-red-600 text-sm">
                  {formState.errors.content[0]}
                </span>
              )}
            </div>

            <div className="flex justify-end gap-4">
              <Button variant={"outline"}>Cancel</Button>
              <Button disabled={isPending}>
                {isPending ? "Loading" : "Publish Article"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlesPage;

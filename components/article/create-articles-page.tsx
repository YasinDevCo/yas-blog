"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const CreateArticlesPage = () => {
  const [content, setContent] = useState("");

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                placeholder="Enter a article title"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <select name="" id="" className="flex h-10 w-full rounded-md">
                <option value="">Select category</option>
                <option value="technology">Technology</option>
                <option value="programming">Programming</option>
                <option value="web-development">Web development</option>
              </select>
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
              {/* <ReactQuill theme="snow" value={content} onChange={setContent} /> */}
            </div>

            <div className="flex justify-end gap-4">
              <Button variant={"outline"}>Cancel</Button>
              <Button>Publish Article</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateArticlesPage;

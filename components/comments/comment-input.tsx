"use client";

import { Avatar } from "../ui/avatar";
import { Input } from "../ui/input";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { createComment } from "@/actions/create-comment";
import React, { useActionState } from "react";

type CommentInputProps = {
  articleId: string;
};

const CommentInput: React.FC<CommentInputProps> = ({ articleId }) => {
  const [formState, action, isPending] = useActionState(
    createComment.bind(null, articleId),
    { errors: {} }
  );
  return (
    <form action={action} className="mb-8">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage
            src={
              // article.author.imageUrl ||
              ""
            }
          />
          <AvatarFallback>
            {
              //   article.author.name
              //     ? article.author.name
              //         .split(" ")
              //         .map((n: string) => n[0])
              //         .join("")
              //     :
              "AU"
            }
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-11">
        <Input type="text" name="body" placeholder="Add a comment..." />
        {formState.errors.body && (
          <p className="text-red-600 text-sm">{formState.errors.body}</p>
        )}
        <div className="flex mt-4 justify-end">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Post comment"}
          </Button>
        </div>
        {formState.errors.formErrors && (
          <div className="p-2 border border-red-600 bg-red-100">
            {formState.errors.formErrors[0]}
          </div>
        )}
      </div>
    </form>
  );
};

export default CommentInput;

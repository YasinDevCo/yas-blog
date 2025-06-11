import React from "react";
import { Avatar } from "../ui/avatar";
import { Input } from "../ui/input";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";

const CommentInput = () => {
  return (
    <form action={""} className="mb-8">
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
        <div className="flex mt-4 justify-end">
          <Button>Post comment</Button>
        </div>
      </div>
    </form>
  );
};

export default CommentInput;

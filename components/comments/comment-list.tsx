import React from "react";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const CommentList = () => {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={
              // article.author.imageUrl ||
              ""
            }
          />
          <AvatarFallback>
            {/* {article.author.name
                    ? article.author.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                    : "AU"} */}
                    CN
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="mb-2">
            <span className="font-medium">author name</span>
            <span className="text-sm ml-2">12 feb</span>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </div>
  );
};

export default CommentList;

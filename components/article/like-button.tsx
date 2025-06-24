"use client";
import React, { useOptimistic, useTransition } from "react";
import { Button } from "../ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { likeDisLikeToggle } from "@/actions/like-dislike";
import { Like } from "@prisma/client";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLike: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLike,
}) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticState, setOptimisticState] = useOptimistic(
    { count: likes.length, liked: isLike },
    (state, liked: boolean) => ({
      count: state.count + (liked ? 1 : -1),
      liked,
    })
  );

  const handleLike = () => {
    // اگر قبلاً لایک کرده بود، نذار ادامه بده
    if (optimisticState.liked) return;

    startTransition(async () => {
      setOptimisticState(true); // فقط لایک اضافه کنه
      await likeDisLikeToggle(articleId); // توی بک‌اند هم ذخیره بشه
    });
  };

  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <Button
        disabled={isPending || optimisticState.liked}
        type="button"
        variant={"ghost"}
        className="gap-2"
        onClick={handleLike}
      >
        <ThumbsUp
          className={`h-5 w-5 ${
            optimisticState.liked ? "text-blue-600" : "text-muted-foreground"
          }`}
        />
        {optimisticState.count}
      </Button>
      <Button variant={"ghost"} className="gap-2">
        <Bookmark className="h-5 w-5" />
      </Button>
      <Button variant={"ghost"} className="gap-2">
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default LikeButton;

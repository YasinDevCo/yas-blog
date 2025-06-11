import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const AllArticlePage = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
        <div className="p-6">
          <div className="relative mb-4 h-48 w-full overflow-hidden  rounded-xl">
            <Image src={'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} alt="blog img" fill className="object-cover" />
          </div>
          <h3 className="text-lg font-semibold">title</h3>
          <p className="mt-2">Lorem ipsum dolor sit.</p>
        
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={''} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Lorem, ipsum.</span>
                </div>
                <div className="text-sm">12 feb</div>
            </div>
        
        
        </div>
      </Card>
    </div>
  );
};

export default AllArticlePage;

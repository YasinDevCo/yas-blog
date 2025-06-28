
export const dynamic = 'force-dynamic';
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  
  try {
    const user = await currentUser();

    if (user) {
      const email = user.emailAddresses?.[0]?.emailAddress || "";
      
      await prisma.user.upsert({
        where: { clerkUserId: user.id },
        update: {},
        create: {
          name: user.fullName || "",
          clerkUserId: user.id,
          email,
          imageUrl: user.imageUrl,
        },
      });
    }
  } catch (err) {
    console.error("Error in Layout:", err);
  }

  return <div>{children}</div>;
};

export default Layout;

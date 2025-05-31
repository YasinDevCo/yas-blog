import { PrismaClient } from "@prisma/client";

declare global {
  // به جای "let" از "var" استفاده کن
  // و به نوع "NodeJS.Global" گسترش بده
  // تا تایپ اسکریپت بفهمه global.prisma داریم
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
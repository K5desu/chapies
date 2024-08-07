"use server";
import prisma from "@/lib/prisma";
import { user } from "@/lib/type";
export default async function getUserById(id: string): Promise<user | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return user;
}

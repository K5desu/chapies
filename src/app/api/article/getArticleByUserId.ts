"use server";
import prisma from "@/lib/prisma";
import { articleCard, user } from "@/lib/type";
export default async function getArticlesAndUserByUserId(
  id: string
): Promise<(user & { articles: articleCard[] }) | null> {
  try {
    const userWithArticles = await prisma.user.findUnique({
      where: { uid: id },
      include: { articles: true },
    });

    return userWithArticles;
  } catch (error) {
    console.error("Error occurred while fetching articles: ", error);
    throw error;
  }
}

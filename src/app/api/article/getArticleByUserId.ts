"use server";
import prisma from "@/lib/prisma";

export default async function getArticlesByUserId(id: string) {
  try {
    const userWithArticles = await prisma.user.findUnique({
      where: { id: id },
      include: { articles: true },
    });

    return userWithArticles?.articles;
  } catch (error) {
    console.error("Error occurred while fetching articles: ", error);
    throw error;
  }
}

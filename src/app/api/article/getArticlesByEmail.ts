"use server";
import prisma from "@/lib/prisma";

export default async function getArticlesByEmail(mail: string) {
  try {
    const userWithArticles = await prisma.user.findUnique({
      where: { mail: mail },
      include: { articles: true },
    });

    return userWithArticles?.articles;
  } catch (error) {
    console.error("Error occurred while fetching articles: ", error);
    throw error;
  }
}

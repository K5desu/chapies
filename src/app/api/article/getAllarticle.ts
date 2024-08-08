"use server";
import prisma from "@/lib/prisma";
import { articleUser, articleCard } from "@/lib/type";
export default async function getAllarticle(): Promise<
  (articleCard & articleUser)[]
> {
  try {
    const articles = await prisma.article.findMany({
      include: {
        user: {
          select: {
            uid: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        clicked: "desc",
      },
    });
    const formattedArticles = articles.map((article) => ({
      ...article,
      name: article.user.name,
      image: article.user.image,
    }));
    return formattedArticles;
  } catch (error) {
    console.error("Error retrieving articles:", error);
    throw error;
  }
}

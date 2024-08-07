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
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });
    return articles;
  } catch (error) {
    console.error("Error retrieving articles:", error);
    throw error;
  }
}

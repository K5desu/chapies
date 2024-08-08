"use server";
import prisma from "@/lib/prisma";
import { articleCard, articleUser } from "@/lib/type";
export async function getArticlesBytitle(
  title: string
): Promise<(articleCard & articleUser)[] | string> {
  try {
    const articles = await prisma.article.findMany({
      where: {
        title: title,
      },
      include: {
        user: true,
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
    return "一致する記事はありません";
  }
}

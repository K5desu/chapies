"use server";
import prisma from "@/lib/prisma";

export default async function deleteArticleById(articleId: string) {
  try {
    const deletedArticle = await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    return deletedArticle;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
}

"use server";
import prisma from "@/lib/prisma";

export default async function addClickedById(articleId: string) {
  try {
    // 現在の clicked 値を取得
    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      throw new Error("Article not found");
    }

    // clicked 値をインクリメントして更新
    const updatedArticle = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        clicked: article.clicked + 1,
      },
    });

    return "ok";
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
}

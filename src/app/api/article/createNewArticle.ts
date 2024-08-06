"use server";
import postLine from "@/lib/article/postLine";

export async function CreateNewArticle(
  title: string,
  imgurl: string,
  articleUrl: string
) {
  try {
    await postLine(title, imgurl, articleUrl, "create");
  } catch (error) {
    throw new Error("記事の投稿に失敗しました");
  }

  return "ok";
}

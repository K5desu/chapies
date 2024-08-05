"use server";
import postLine from "@/lib/article/postLine";

export async function CreateNewArticle(title: string, url: string) {
  try {
    await postLine(title, url, "https://chapies.vercel.app/", "create");
  } catch (error) {
    throw new Error("記事の投稿に失敗しました");
  }

  return "ok";
}

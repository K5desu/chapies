"use server";
import postLine from "@/lib/article/postLine";

export async function CreateNewArticle(title: string, url: string) {
  try {
    await postLine(title, url, "https://chapies.vercel.app/");
  } catch (error) {
    return "error";
  }

  return "ok";
}

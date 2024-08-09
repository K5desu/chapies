"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import replyai from "@/app/api/Ai/replyai";
import { getArticlesBytitle } from "@/app/api/article/getArticlesBytitle";
import { useState, useRef } from "react";
import { articleCard, articleUser } from "@/lib/type";
import Cards from "@/components/ui/cards";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
export default function Page() {
  const [replys, setReplys] = useState<string | null>(null);
  const articlesRef = useRef<
    (articleCard & articleUser)[] | undefined | null | string
  >(null);
  const IsRyu = RyuAuthenticator();
  async function handleSubmit(formData: FormData) {
    const question = formData.get("question") as string;
    try {
      const reply = await replyai(question);
      if (typeof reply === "string") {
        articlesRef.current = await getArticlesBytitle(reply);
        setReplys(reply);
      } else {
        setReplys("該当する施設はありません");
      }
    } catch (error) {
      console.error("Error getting reply:", error);
    }
  }

  return (
    <div>
      <form className="flex  gap-x-4" action={handleSubmit}>
        <Input name="question" placeholder="何をしたい？"></Input>
        <Button type="submit">聞く</Button>
      </form>
      <div className="text-black font-bold text-xl p-4 m-4 border-2 border-black rounded-lg text-center sm:text-base sm:p-2 sm:m-2">
        AIの解答:{replys}user
      </div>
      {typeof articlesRef.current != "string" && articlesRef.current != null ? (
        <Cards owner={false} isRyu={IsRyu} posts={articlesRef.current} />
      ) : (
        <div>該当する記事はありません</div>
      )}
    </div>
  );
}

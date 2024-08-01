"use client";

import type { PutBlobResult } from "@vercel/blob";
import { CreateNewArticle } from "@/app/api/article/createNewArticle";
import { useRef } from "react";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useArticleStore } from "@/store/article-store";
import { useToast } from "@/components/toast/use-toast";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import Logout from "@/components/google/Logout";
import { Button } from "@/components/ui/button";
export default function Page() {
  const isRyu = RyuAuthenticator();
  const { toast } = useToast();
  const { title, content, setArticleContent } = useArticleStore();
  const inputFileRef = useRef<HTMLInputElement>(null);
  async function handleSubmit() {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    const response = await fetch(`/api/img?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const newBlob = (await response.json()) as PutBlobResult;
    await CreateNewArticle(title, newBlob.url);
    toast({
      title: "記事が投稿されました",
      description:
        "新しい記事の投稿に成功しました。マイページを確認してください",
    });
  }

  return (
    <>
      {isRyu ? (
        <form action={handleSubmit}>
          <Input placeholder="notionのurl"></Input>
          <Input type="file" ref={inputFileRef} required />
          <FacilityName action="create" />
          <FacilityTag action="create" />
          <Textarea
            onChange={(e) => {
              setArticleContent(e.target.value);
            }}
            value={content}
            placeholder="Content"
          />
          <Button type="submit">upload</Button>
        </form>
      ) : (
        <div>
          <p>あなたはログインしていないor認められたアカウントではありません</p>
          <Logout />
        </div>
      )}
    </>
  );
}

"use client";

import type { PutBlobResult } from "@vercel/blob";
import { CreateNewArticle } from "@/app/api/article/createNewArticle";
import { useRef, useState } from "react";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useArticleStore } from "@/store/article-store";
import { useToast } from "@/components/toast/use-toast";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import Logout from "@/components/google/Logout";
import { Button } from "@/components/ui/button";
import NotRyuAlert from "@/components/google/notRyuAlert";
export default function Page() {
  const isRyu = RyuAuthenticator();
  const [articleUrl, setArticleUrl] = useState("");
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
    await CreateNewArticle(title, newBlob.url, articleUrl);
    toast({
      title: "記事が投稿されました",
      description:
        "新しい記事の投稿に成功しました。マイページを確認してください",
    });
  }

  return (
    <>
      {isRyu ? (
        <form action={handleSubmit} className="flex flex-col gap-y-4">
          <Input
            placeholder="外部の記事のurl"
            value={articleUrl}
            onChange={(e) => setArticleUrl(e.target.value)}
          ></Input>
          <Input type="file" ref={inputFileRef} required />
          <div className="flex gap-x-4">
            <FacilityName action="create" />
            <FacilityTag action="create" />
          </div>
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
          <NotRyuAlert message=" あなたはログインしていないor認められたアカウントではないので記事の閲覧のみ可能です" />
          <Logout />
        </div>
      )}
    </>
  );
}

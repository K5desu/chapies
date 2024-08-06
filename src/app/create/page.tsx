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
import Card from "@/components/ui/card";
import NotRyuAlert from "@/components/google/notRyuAlert";

export default function Page() {
  const [imageUrl, setImageUrl] = useState("");
  const isRyu = RyuAuthenticator();
  const [articleUrl, setArticleUrl] = useState("");
  const { toast } = useToast();
  const { title, content, setArticleContent, tag } = useArticleStore();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4.5 * 1024 * 1024) {
        // 500MBをバイトに変換
        toast({
          variant: "destructive",
          title: "画像サイズが大きすぎます",
          description: "ファイルサイズは4.5MB以下にしてください。",
        });

        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
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
          <Input
            type="file"
            ref={inputFileRef}
            required
            placeholder="500mb以下の画像を選択してください"
            onChange={handleImageChange}
          />
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
          <div className="md:mx-auto">
            <Card
              title={title}
              content={content}
              tags={tag}
              img={imageUrl}
              url={articleUrl}
              userid="1"
              isRyu={true}
            />
          </div>
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

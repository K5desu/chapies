"use client";

import type { PutBlobResult } from "@vercel/blob";
import { CreateNewArticle } from "@/app/api/article/createNewArticle";
import createUser from "@/app/api/user/createUser";
import { useRef, useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSession } from "next-auth/react";
import createArticleByEmail from "@/app/api/article/createArticleByEmail";
export default function Page() {
  const [imageUrl, setImageUrl] = useState("");
  const { data: session } = useSession();
  const isRyu = RyuAuthenticator();
  const [articleUrl, setArticleUrl] = useState("");
  const { toast } = useToast();
  const { title, content, setArticleContent, tag } = useArticleStore();
  const [campas, setCampas] = useState(true);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const textareaHandler = useDebouncedCallback((term) => {
    setArticleContent(term);
  }, 2000);
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
  useEffect(() => {
    if (isRyu && session && session.user?.email && session.user?.image) {
      createUser(session.user.email, session.user.image);
    }
  }, [session, isRyu]);
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
    if (session?.user?.email)
      await createArticleByEmail(
        session.user.email,
        title,
        content,
        tag,
        campas,
        newBlob.url,
        articleUrl
      );
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
            <RadioGroup
              defaultValue="option-one"
              onValueChange={() => {
                setCampas(!campas);
                console.log(campas);
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-one" id="option-one" />
                <Label htmlFor="option-one" onChange={() => setCampas(true)}>
                  深草
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-two" id="option-two" />
                <Label htmlFor="option-two">瀬田</Label>
              </div>
            </RadioGroup>
          </div>
          <Textarea
            onChange={(e) => textareaHandler(e.target.value)}
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
              userimg=""
              campas={campas}
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

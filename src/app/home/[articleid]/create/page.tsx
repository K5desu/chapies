"use client";

import type { PutBlobResult } from "@vercel/blob";
import { CreateNewArticle } from "@/app/api/article/createNewArticle";
import { useRef } from "react";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useArticleStore } from "@/store/article-store";
export default function Page() {
  const { title, tag } = useArticleStore();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [content, setContent] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
  }
  console.log(title);
  return (
    <>
      <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <Input type="file" ref={inputFileRef} />
        <FacilityName />
        <FacilityTag />
        <Textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          placeholder="Content"
        />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

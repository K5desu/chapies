"use client";

import type { PutBlobResult } from "@vercel/blob";
import { CreateNewArticle } from "@/app/api/article/createNewArticle";
import { useState, useRef } from "react";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";
export default function Page() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  let title: string;
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
  return (
    <>
      <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Uploadaa</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
      <FacilityName />
      <FacilityTag />
    </>
  );
}

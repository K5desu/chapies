"use client";
import { useState } from "react";
import { useToast } from "@/components/toast/use-toast";
export default function Page() {
  const [input, setInput] = useState("");
  const data = {
    mail: "example@mail.com",
    owner: true,
    content: "記事の内容",
    tags: "食事",
    campas: true,
    title: input,
    img: "画像のURL",
  };
  const { toast } = useToast();
  async function postArticle() {
    await fetch("http://localhost:3000/api/article", {
      method: "POST", // HTTPメソッド
      headers: {
        "Content-Type": "application/json", // コンテントタイプ
      },
      body: JSON.stringify(data), // データを文字列化
    })
      .then((response) => response.json()) // レスポンスのJSONを解析
      .then((data) => {
        console.log("Success:", data); // 成功時の処理
      })
      .catch((error) => {
        console.error("Error:", error); // エラー時の処理
      });
  }
  return (
    <div>
      <input
        className="border border-black"
        value={input}
        onChange={(e) => setInput(e.currentTarget.value)}
      />
      <button
        onClick={async () => {
          setInput("");
          toast({
            title: "送信しました ",
            description: "記事を送信しました",
          });
          await postArticle();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        送信
      </button>
    </div>
  );
}

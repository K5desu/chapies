"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  console.log("text", text);
  console.log("response", response);

  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={async () => {
          const res = await fetch("/api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text }),
          });
          const data = await res.json();
          if (
            data.candidates &&
            data.candidates &&
            data.candidates[0].content.parts[0]
          ) {
            // `response`変数に直接文字列を設定
            setResponse(data.candidates[0].content.parts[0].text || "");
          }
        }}
      >
        送信
      </button>
      <p>{response}</p>
    </>
  );
}

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { addNewFacility } from "@/app/api/linelib/addNewFacility";
export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  console.log("text", text);
  console.log("response", response);

  async function sendText() {
    const res = await addNewFacility(text);

    if (res === "OK") {
      setResponse("OK");
    } else {
      setResponse("NG");
    }
  }
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 w-1/2 p-2"
      />
      <button
        onClick={async () => await sendText()}
        className="border border-gray-300"
      >
        送信
      </button>
      <p>{response}</p>
    </>
  );
}

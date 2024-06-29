"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
export default function Tastex() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  return (
    <div>
      <input
        type="text"
        name="text"
        className="border border-gray-300 w-1/2 p-2 "
        placeholder="メッセージを入力"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />

      <button
        type="submit"
        onClick={() => {
          setText("");
          toast({
            title: "送信完了",
            description: "全体送信されました",
          });
        }}
      >
        全体送信
      </button>
    </div>
  );
}

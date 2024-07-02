"use client";
import { useState } from "react";
import { POST } from "@/app/api/article/route";
import { useToast } from "@/components/ui/use-toast";
export default function Page() {
  const [name, setName] = useState("");
  const { toast } = useToast();
  return (
    <div>
      <input
        type="text "
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={async () => {
          await POST(name);
          setName("");
          toast({
            title: "送信しました ",
            description: "記事を送信しました",
          });
        }}
      >
        送信
      </button>
    </div>
  );
}

import React from "react";
import { useSession, signIn } from "next-auth/react";
import Load from "@/components/ui/load";

export default function Login() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Load />;
  }

  if (status !== "authenticated") {
    return (
      <div>
        <p>あなたはログインしていません</p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-150 ease-in-out"
          onClick={() => signIn("google", {}, { prompt: "login" })}
        >
          Googleでログイン
        </button>
      </div>
    );
  }
  return null;
}

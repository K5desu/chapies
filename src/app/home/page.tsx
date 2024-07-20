"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";

import * as React from "react";

import { useTheme } from "next-themes";
import DarkMode from "@/components/ui/darkMode";
export default function Page() {
  const { data: session, status } = useSession();
  let emailDomain = "";
  const { setTheme } = useTheme();
  if (session) {
    emailDomain =
      session.user?.email && session.user.email.includes("@")
        ? session.user.email.split("@")[1]
        : "";
  }
  return (
    <>
      <DarkMode />

      {status === "authenticated" && emailDomain === "mail.ryukoku.ac.jp" ? (
        <div>
          <h1>Home</h1>
          <Link
            href="/home/uuid/create"
            className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            投稿
          </Link>
          <p>セッションの期限：{session.expires}</p>
          <p>ようこそ、{session.user?.name}さん</p>
        </div>
      ) : (
        <div>
          <p>あなたはログインしていないor認められたアカウントではありません</p>
        </div>
      )}
    </>
  );
}

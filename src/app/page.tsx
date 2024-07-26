"use client";
import Link from "next/link";
import * as React from "react";
import DarkMode from "@/components/ui/darkMode";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
export default function Page() {
  const isRyu = RyuAuthenticator();
  return (
    <>
      {isRyu ? (
        <div>
          <h1>Home</h1>
          <Link
            href="/uuid/create"
            className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            投稿
          </Link>
        </div>
      ) : (
        <div>
          <p>あなたはログインしていないor認められたアカウントではありません</p>
        </div>
      )}
      <DarkMode />
    </>
  );
}

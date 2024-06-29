"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
export default function Page() {
  const { data: session, status } = useSession();

  return (
    <>
      <h1>Home</h1>
      <Link href="/home/">投稿</Link>

      {status === "authenticated" ? (
        <div>
          <p>セッションの期限：{session.expires}</p>
          <p>ようこそ、{session.user?.name}さん</p>
        </div>
      ) : (
        <div>
          <p>あなたはログインしていません</p>
        </div>
      )}
    </>
  );
}

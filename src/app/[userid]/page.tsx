"use client";
import React, { Suspense } from "react";
import Cards from "@/components/ui/cards";
import Profile from "@/components/ui/profile";
import { Skeleton } from "@/components/ui/skeleton";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
export default function Page({ params }: { params: { userid: string } }) {
  // 仮のユーザーデータと投稿データ
  const isRyu = RyuAuthenticator();
  if (!isRyu) return <div>大学アカウントでログインしてください</div>;

  return (
    <>
      <div className="max-w-4xl mx-auto p-5">
        <Profile />
        <section>
          <h2 className="text-xl font-bold mb-5">投稿記事</h2>
          <Suspense fallback={<Skeleton />}>
            <Cards />
          </Suspense>
        </section>
      </div>
    </>
  );
}

import React, { Suspense } from "react";
import Card from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
export default function Page({ params }: { params: { userid: string } }) {
  // 仮のユーザーデータと投稿データ
  const user = {
    name: "山田 太郎",
    level: 10,
    iconUrl: "/user-icon.png",
    message: "フロントエンド開発が好きです！",
  };

  const posts = [
    {
      id: 1,
      title: "Reactの基本",
      summary: "Reactの基本的な使い方について解説します。",
    },
    {
      id: 2,
      title: "Tailwind CSSの魅力",
      summary: "なぜTailwind CSSが便利なのか、その理由を説明します。",
    },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto p-5">
        <section className="text-center mb-10">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback></AvatarFallback>
          </Avatar>

          <h1 className="text-3xl font-bold mt-3">{user.name}</h1>
          <section className="mb-10">
            <h2 className="text-xl font-bold">一言メッセージ</h2>
            <p className="mt-2">{user.message}</p>
          </section>
          <p>レベル: {user.level}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-5">投稿記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <Suspense fallback={<Skeleton />} key={post.id}>
                <Card
                  id={post.id.toString()}
                  title={post.title}
                  content={post.summary}
                  tags="React"
                  campas={true}
                  img="https://source.unsplash.com/random"
                  url="/"
                  userid="/"
                />
              </Suspense>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

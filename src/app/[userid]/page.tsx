"use client";
import { useEffect, useRef, useState } from "react";
import Cards from "@/components/ui/cards";
import Profile from "@/components/ui/profile";
import { articleCard, user } from "@/lib/type";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import getArticlesAndUserByUserId from "@/app/api/article/getArticleByUserId";
import { CardsSkeleton } from "@/components/ui/cardSkeleton";
export default function Page({ params }: { params: { userid: string } }) {
  // 仮のユーザーデータと投稿データ
  const [loading, setLoading] = useState(false);
  const articlesRef = useRef<(user & { articles: articleCard[] }) | null>(null);
  const isRyu = RyuAuthenticator();
  useEffect(() => {
    async function fetchData() {
      if (isRyu) {
        articlesRef.current = await getArticlesAndUserByUserId(params.userid);
        // articlesを使用して何かを行う
        setLoading(true);
      }
    }
    fetchData();
  }, [isRyu]);
  const getUserInfo = () => {
    if (articlesRef.current) {
      const { articles, ...user } = articlesRef.current;
      return user;
    } else {
      return null;
    }
  };

  if (!isRyu) return <div>大学アカウントでログインしてください</div>;

  return (
    <>
      <div className="max-w-4xl mx-auto p-5">
        <Profile {...getUserInfo()} IsRyu={isRyu} />
        <section>
          <h2 className="text-xl font-bold mb-5">投稿記事</h2>
          {loading ? (
            <Cards
              owner={false}
              isRyu={isRyu}
              posts={
                articlesRef.current &&
                (() => {
                  const { name, image, uid, articles } = articlesRef.current;
                  return articles.map((article) => ({
                    ...article,
                    name,
                    image,
                    uid,
                  }));
                })()
              }
            />
          ) : (
            <CardsSkeleton />
          )}
        </section>
      </div>
    </>
  );
}

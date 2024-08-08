"use client";
import { useEffect, useRef, useState } from "react";
import Profile from "@/components/ui/profile";
import Logout from "@/components/google/Logout";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import NotRyuAlert from "@/components/google/notRyuAlert";
import Cards from "@/components/ui/cards";
import { useSession } from "next-auth/react";
import createUser from "@/app/api/user/createUser";
import { articleCard, user } from "@/lib/type";
import getArticlesAndUserByEmail from "@/app/api/article/getArticlesAndUserByEmail";
import { CardsSkeleton } from "@/components/ui/cardSkeleton";
import { ProfileSkeleton } from "@/components/ui/profileSkeleton";
export default function Page() {
  const [loading, setLoading] = useState(false);
  const isRyu = RyuAuthenticator();
  const { data: session } = useSession();
  const articlesRef = useRef<(user & { articles: articleCard[] }) | null>(null);
  const userRef = useRef<user | null>(null);
  // 仮のユーザーデータと投稿データ
  useEffect(() => {
    async function fetchData() {
      if (isRyu && session && session.user?.email && session.user?.image) {
        userRef.current = await createUser(session.user.email);
        articlesRef.current = await getArticlesAndUserByEmail(
          session.user.email
        );
        setLoading(true);
        // articlesを使用して何かを行う
      }
    }
    fetchData();
  }, [session, isRyu]);

  return (
    <>
      {isRyu ? (
        <div className="max-w-4xl mx-auto p-5 ">
          <div className=" flex flex-col items-center ">
            {loading ? (
              <Profile {...userRef.current} IsRyu={isRyu} />
            ) : (
              <ProfileSkeleton />
            )}

            <Logout />
          </div>

          <section>
            <h2 className="text-xl font-bold mb-5">投稿記事</h2>
            {loading ? (
              <Cards
                owner={true}
                isRyu={isRyu}
                posts={
                  articlesRef.current &&
                  (() => {
                    const { name, image, id, articles } = articlesRef.current;
                    return articles.map((article) => ({
                      ...article,
                      name,
                      image,
                      id,
                    }));
                  })()
                }
              />
            ) : (
              <CardsSkeleton />
            )}
          </section>
        </div>
      ) : (
        <div>
          <NotRyuAlert message=" あなたはログインしていないor認められたアカウントではないのでマイページの利用はできません" />
        </div>
      )}
    </>
  );
}

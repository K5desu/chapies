"use client";
import { useEffect, useRef, useState } from "react";
import Profile from "@/components/ui/profile";
import Logout from "@/components/google/Logout";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import NotRyuAlert from "@/components/google/notRyuAlert";
import Cards from "@/components/ui/cards";
import { useSession } from "next-auth/react";
import createUser from "@/app/api/user/createUser";
import { articleCard } from "@/lib/type";
import getArticlesByEmail from "@/app/api/article/getArticlesByEmail";
import { CardsSkeleton } from "@/components/ui/cardSkeleton";
export default function Page() {
  const [loading, setLoading] = useState(false);
  const isRyu = RyuAuthenticator();
  const { data: session } = useSession();
  const articlesRef = useRef<articleCard[] | undefined | null>([]);
  // 仮のユーザーデータと投稿データ
  useEffect(() => {
    async function fetchData() {
      if (isRyu && session && session.user?.email && session.user?.image) {
        await createUser(session.user.email, session.user.image);
        articlesRef.current = await getArticlesByEmail(session.user.email);
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
            <Profile
              userId={null}
              userEmail={
                (session && session.user && session.user.email) || null
              }
              IsRyu={isRyu}
            />
            <Logout />
          </div>

          <section>
            <h2 className="text-xl font-bold mb-5">投稿記事</h2>
            {loading ? (
              <Cards isRyu={isRyu} posts={articlesRef.current} />
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

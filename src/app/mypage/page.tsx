"use client";
import React, { Suspense } from "react";
import Profile from "@/components/ui/profile";
import Logout from "@/components/google/Logout";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import { Skeleton } from "@/components/ui/skeleton";
import NotRyuAlert from "@/components/google/notRyuAlert";
import Cards from "@/components/ui/cards";
import { useSession } from "next-auth/react";
export default function Page() {
  const isRyu = RyuAuthenticator();
  const { data: session } = useSession();

  // 仮のユーザーデータと投稿データ

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

            <Suspense fallback={<Skeleton />}>
              <Cards isRyu={isRyu} />
            </Suspense>
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

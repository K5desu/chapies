"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { articleCard, articleUser } from "@/lib/type";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSearchStore } from "@/store/article-store";
import getAllarticle from "@/app/api/article/getAllarticle";
import NotRyuAlert from "@/components/google/notRyuAlert";
import Cards from "@/components/ui/cards";
import { CardsSkeleton } from "@/components/ui/cardSkeleton";
export default function Page() {
  const [loading, setLoading] = useState(false);
  const isRyu = RyuAuthenticator();
  const searchParams = useSearchParams();
  const articlesRef = useRef<(articleCard & articleUser)[] | undefined | null>(
    null
  );
  const { name, searchtag } = useSearchStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const articleId = searchParams.get("id");
  const articleName = searchParams.get("name");
  const articleTag = searchParams.get("tag");
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (name) {
      params.set("name", name);
    }
    if (searchtag) {
      params.set("tag", searchtag);
    }
    if (!name && !searchtag) {
      params.delete("name");
      params.delete("tag");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [name, searchtag]);
  useEffect(() => {
    async function fetchData() {
      articlesRef.current = await getAllarticle();
      setLoading(true);
      // articlesを使用して何かを行う
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full p-4   ">
      <div className="flex  flex-col items-end gap-y-8">
        {isRyu ? (
          <div>
            <Link
              href="/create"
              className="inline-block bg-black text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-150 ease-in-out"
            >
              投稿する
            </Link>
          </div>
        ) : (
          <div className="mx-auto">
            <NotRyuAlert message=" あなたはログインしていないor龍大アカウントではないので記事の閲覧のみ可能です" />
          </div>
        )}
        <div className="flex justify-center gap-x-4">
          <FacilityName action="search" />
          <FacilityTag action="search" />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold mb-10 mt-5 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-teal-400 ">
          記事一覧
        </h1>
        {loading ? (
          <Cards isRyu={isRyu} posts={articlesRef.current} />
        ) : (
          <CardsSkeleton />
        )}
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import * as React from "react";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSearchStore } from "@/store/article-store";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Cards from "@/components/ui/cards";
export default function Page() {
  const isRyu = RyuAuthenticator();
  const searchParams = useSearchParams();
  const { name, searchtag } = useSearchStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  const articleId = searchParams.get("id");
  const articleName = searchParams.get("name");
  const articleTag = searchParams.get("tag");
  React.useEffect(() => {
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
  return (
    <div className="flex flex-col w-4/5 p-4   ">
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
          <div>
            <p>
              あなたはログインしていないor認められたアカウントではないので記事の閲覧のみ可能です
            </p>
          </div>
        )}
        <div className="flex justify-center gap-x-4">
          <FacilityName action="search" />
          <FacilityTag action="search" />
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-extrabold mb-10  text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-teal-400 ">
          記事一覧
        </h1>
        <Suspense fallback={<Skeleton />}>
          <Cards />
        </Suspense>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import * as React from "react";
import DarkMode from "@/components/ui/darkMode";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import { FacilityName } from "@/components/article/facility-name";
import { FacilityTag } from "@/components/article/facility-tag";
import { Button } from "@/components/ui/button";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useSearchStore } from "@/store/article-store";
export default function Page() {
  const isRyu = RyuAuthenticator();
  const searchParams = useSearchParams();
  const { name, searchtag } = useSearchStore();
  const pathname = usePathname();
  const { replace } = useRouter();
  console.log("searchParams", searchParams.get("name"));
  console.log("searchParams", searchParams.get("tag"));
  console.log("searchParams", searchParams.get("id"));
  function handleSearch() {
    const params = new URLSearchParams(searchParams);
    if (name || searchtag) {
      params.set("name", name);
      params.set("tag", searchtag);
    } else {
      params.delete("name");
      params.delete("tag");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      {isRyu ? (
        <div>
          <h1>Home</h1>
          <Link
            href="/create"
            className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            投稿
          </Link>
        </div>
      ) : (
        <div>
          <p>
            あなたはログインしていないor認められたアカウントではないので記事の閲覧のみ可能です
          </p>
        </div>
      )}

      <DarkMode />

      <form action={handleSearch} className="display block">
        <FacilityName action="search" />
        <FacilityTag action="search" />
        <Button type="submit">search!!</Button>
      </form>
    </>
  );
}

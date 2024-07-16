"use client";

import { useSession } from "next-auth/react";
import Login from "@/components/google/Login";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home"); // 認証済みの場合、/home にリダイレクト
    }
  }, [status, router]); // 依存配列に status と router を追加

  return <div>{status !== "authenticated" && <Login />}</div>;
}

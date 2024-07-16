"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Logout from "@/components/google/Logout";
import Login from "@/components/google/Login";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Page() {
  const { data: session, status } = useSession();
  let emailDomain = "";
  const { setTheme } = useTheme();
  if (session) {
    emailDomain =
      session.user?.email && session.user.email.includes("@")
        ? session.user.email.split("@")[1]
        : "";
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {status === "authenticated" && emailDomain === "mail.ryukoku.ac.jp" ? (
        <div>
          <h1>Home</h1>
          <Link
            href="/home/uuid/create"
            className="inline-block bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            投稿
          </Link>
          <p>セッションの期限：{session.expires}</p>
          <p>ようこそ、{session.user?.name}さん</p>
          <Logout />
        </div>
      ) : (
        <div>
          <p>あなたはログインしていないor認められたアカウントではありません</p>
          <Login />
        </div>
      )}
    </>
  );
}

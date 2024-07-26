"use client";

import Login from "@/components/google/Login";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLinks from "@/components/sidenav/navlinks";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
export default function SideNav() {
  const isRyu = RyuAuthenticator();
  const pathname = usePathname();
  const isActive = pathname === "/mypage";
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 justify-between">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-gray-600 p-4 md:h-40"
        href="/"
      >
        <div className="flex items-center h-full w-32 text-white md:w-40"></div>
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />

        <div>
          {isRyu ? (
            <Link
              href="/mypage"
              className={`flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3  hover cursor-pointer ${
                isActive ? "bg-red-100" : "bg-red-600"
              }`}
            >
              マイページ
            </Link>
          ) : (
            <Login></Login>
          )}
        </div>
      </div>
    </div>
  );
}

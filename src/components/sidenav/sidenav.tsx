"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLinks from "@/components/sidenav/navlinks";

export default function SideNav() {
  const pathname = usePathname();

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
      </div>
    </div>
  );
}

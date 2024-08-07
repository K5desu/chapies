"use client";
import Link from "next/link";
import NavLinks from "@/components/sidenav/navlinks";
import Image from "next/image";
export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 justify-between">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-red-100 p-4 md:h-40"
        href="/"
      >
        <Image
          src="/cover.jpg"
          width={300}
          height={120}
          alt="cover"
          className="w-full h-full md:hidden"
        />

        <Image
          src="/icon.png"
          width={140}
          height={140}
          alt="icon"
          className="w-full h-full hidden md:block"
        />
      </Link>
      <div className="flex grow flex-row space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}

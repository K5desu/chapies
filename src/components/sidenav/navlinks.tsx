// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeIcon } from "@/components/ui/icons";
import { AiIcon } from "@/components/ui/icons";

const links = [
  { name: "ホーム", href: "/", icon: HomeIcon },
  { name: "AIsearch", href: "/AI", icon: AiIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  let isActive;
  return (
    <>
      {links.map((link) => {
        isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              isActive ? "bg-red-100" : "bg-red-600"
            }`}
            href={link.href}
          >
            <link.icon />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

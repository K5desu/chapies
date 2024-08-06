import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface CardProps {
  title: string;
  content: string;
  tags: string;
  img: string;
  url: string;
  userid: string;
  isRyu: boolean;
}

export default async function Card({
  title,
  content,
  tags,
  img,
  url,
  userid,
  isRyu,
}: CardProps) {
  const like = true;
  return (
    <>
      <Link href={url}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src={img} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{content}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tags}
            </span>
            <div className="flex justify-between">
              {isRyu ? (
                <Link href={userid}>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

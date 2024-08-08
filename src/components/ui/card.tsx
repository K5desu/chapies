import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { articleCard, articleUser } from "@/lib/type";
import addClickedById from "@/app/api/article/addClickedById";
import deleteArticleById from "@/app/api/article/deleteArticleById";
type CardProps = articleCard & articleUser;

export default async function Card({
  id,
  owner,
  title,
  content,
  tags,
  img,
  url,
  userid,
  image,
  campas,
  name,
  isRyu,
}: CardProps & { isRyu: boolean } & { owner: boolean }) {
  const like = true;
  return (
    <>
      <Link
        href={url || "/"}
        onClick={async () => id && (await addClickedById(id))}
      >
        <div className="max-w-[300px] max-h-[400px] rounded overflow-hidden shadow-lg">
          <img
            className="w-full max-h-[250px]"
            src={img}
            alt="Sunset in the mountains"
          />
          <div className="px-6 py-4 max-h-[80px]">
            <div className="flex justify-between">
              <div className="font-bold text-xl ">{title}</div>
              {owner && (
                <Badge
                  className="z-10"
                  variant="destructive"
                  onClick={async () => {
                    if (id) {
                      await deleteArticleById(id);
                      window.location.reload();
                    }
                  }}
                >
                  削除
                </Badge>
              )}
            </div>
            <p className="text-gray-700 text-base">{content}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {tags}
            </span>
            {campas ? (
              <Badge variant="fcampas">深草</Badge>
            ) : (
              <Badge variant="scampas">瀬田</Badge>
            )}

            <div className="flex justify-between">
              {isRyu ? (
                <Link href={userid} className="flex gap-x-3">
                  <Avatar>
                    <AvatarImage src={image || "/annonymous.jpg"} />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>
                  <p className="text-gray-700 text-base mt-3 font-bold">
                    {name}
                  </p>
                </Link>
              ) : (
                <>
                  <Avatar>
                    <AvatarImage src="/annonymous.jpg" />
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

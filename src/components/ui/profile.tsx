import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfile } from "@/components/mypage/edit-profile";

export default function Profile(props: {
  userId: string | null;
  userEmail: string | null;
  IsRyu: boolean;
}) {
  const user = {
    name: "山田 太郎",
    iconUrl: "/user-icon.png",
    message: "フロントエンド開発が好きです！",
    insta: "https://www.instagram.com/",
    x: "https://x.com/",
    github: "https://github.com/K5desu",
  };
  return (
    <div className="text-center h-auto">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback></AvatarFallback>
      </Avatar>

      <div>
        <h1 className="text-3xl font-bold mt-3">{user.name}</h1>
        <section className="mb-10">
          <h2 className="text-xl font-bold">一言メッセージ</h2>

          <p className="mt-2">{user.message}</p>
          <h2 className="text-xl font-bold">連絡先</h2>

          <a
            href={user.github}
            className="block text-blue-500 hover:text-blue-700 underline"
          >
            {user.github}
          </a>
          {props.IsRyu && (
            <EditProfile
              name={user.name}
              message={user.message}
              useraddress={user.github}
            />
          )}
        </section>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EditProfile } from "@/components/mypage/edit-profile";
import { Label } from "@/components/ui/label";
import { user } from "@/lib/type";
import { Editprofileimg } from "@/components/mypage/edit-profileimg";
export default function Profile(props: (user & { IsRyu: boolean }) | null) {
  return (
    <div className="flex flex-col items-center h-auto">
      <div className="flex items-center justify-center">
        <Avatar className="w-1/5 h-1/5">
          <AvatarImage src={(props && props.image) || "/annonymous.jpg"} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
        {props && props.IsRyu && <Editprofileimg />}
      </div>
      <div>
        <h1 className="text-3xl font-bold mt-3">
          {(props && props.name) || "未設定"}
        </h1>
        <section className="mb-2">
          <h2 className="text-xl font-bold">一言メッセージ</h2>

          <p className="mt-2">{(props && props.message) || "未設定"}</p>
          <h2 className="text-xl font-bold">連絡先</h2>

          <Label className="font-bold">insta</Label>
          {props && props.instagram && props.instagram != "未設定" ? (
            <a
              href={props.instagram}
              className="block text-blue-500 hover:text-blue-700 underline"
              id="terms"
            >
              {props.instagram}
            </a>
          ) : (
            <div>未設定</div>
          )}

          <Label className="font-bold">X</Label>
          {props && props.X && props.X != "未設定" ? (
            <a
              href={props.X}
              className="block text-blue-500 hover:text-blue-700 underline"
              id="terms"
            >
              {props.X}
            </a>
          ) : (
            <div>未設定</div>
          )}

          <Label className="font-bold">github</Label>
          {props && props.github && props.github != "未設定" ? (
            <a
              href={props.github}
              className="block text-blue-500 hover:text-blue-700 underline mb-2"
              id="terms"
            >
              {props.github}
            </a>
          ) : (
            <div>未設定</div>
          )}

          <div className="text-center">
            {props && props.IsRyu && (
              <EditProfile
                name={props.name || "未設定"}
                message={props.message || "未設定"}
                github={props.github || "未設定"}
                insta={props.instagram || "未設定"}
                x={props.X || "未設定"}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

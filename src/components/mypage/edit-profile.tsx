"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RyuAuthenticator } from "@/lib/ryu-authentcator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import updateUserInfoByEmail from "@/app/api/user/changeUserInfoByEmail";
export function EditProfile(props: {
  name: string;
  message: string;
  insta: string;
  github: string;
  x: string;
}) {
  const isRyu = RyuAuthenticator();
  const { data: session } = useSession();
  async function handleSubmit(formData: FormData) {
    if (isRyu && session && session.user?.email) {
      await updateUserInfoByEmail(
        session.user.email,
        formData.get("name") as string,
        formData.get("message") as string,
        formData.get("instagram") as string,
        formData.get("X") as string,
        formData.get("github") as string
      );
      window.location.reload();
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">編集</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>完了ボタンを押すと自動的に更新されます</DialogTitle>
          <DialogDescription>
            連絡先は不特定多数の龍大生に公開されます
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                名前
              </Label>
              <Input
                name="name"
                defaultValue={props.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                コメント
              </Label>
              <Textarea
                name="message"
                defaultValue={props.message}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                インスタ
              </Label>
              <Input
                name="instagram"
                defaultValue={props.insta}
                className="col-span-3"
                placeholder="インスタアカウント"
              />
              <Label htmlFor="username" className="text-right">
                X
              </Label>
              <Input
                name="X"
                defaultValue={props.x}
                className="col-span-3"
                placeholder="Xアカウント"
              />
              <Label htmlFor="username" className="text-right">
                github
              </Label>
              <Input
                name="github"
                defaultValue={props.github}
                className="col-span-3"
                placeholder="githubアカウント"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">完了</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

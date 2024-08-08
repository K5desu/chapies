import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useRef } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { useSession } from "next-auth/react";
import changeUserImgByEmail from "@/app/api/user/changeUserImgByEmail";
import { useToast } from "@/components/toast/use-toast";
export function Editprofileimg() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const inputFileRef = useRef<HTMLInputElement>(null);
  async function handleSubmit() {
    if (!inputFileRef.current?.files) {
      toast({
        variant: "destructive",
        title: "画像が選択されていません",
        description: "画像を選択してください",
      });
      return;
    }

    const file = inputFileRef.current.files[0];
    if (file.size > 4.5 * 1024 * 1024) {
      // 500MBをバイトに変換
      toast({
        variant: "destructive",
        title: "画像サイズが大きすぎます",
        description: "ファイルサイズは4.5MB以下にしてください。",
      });

      return;
    }
    const response = await fetch(`/api/img?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    const newBlob = (await response.json()) as PutBlobResult;
    if (session?.user?.email) {
      await changeUserImgByEmail(session.user.email, newBlob.url);
      window.location.reload();
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BorderColorIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>画像編集</DialogTitle>
          <DialogDescription>
            新しい画像をアップロードしてください
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center ">
            <form action={handleSubmit} className="flex flex-col gap-y-4">
              <Input
                id="name"
                type="file"
                className="col-span-3"
                ref={inputFileRef}
              />
              <Button type="submit">Save changes</Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
export function Editprofileimg() {
  const { data: session } = useSession();
  const inputFileRef = useRef<HTMLInputElement>(null);
  async function handleSubmit() {
    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              画像
            </Label>
            <Input
              id="name"
              type="file"
              className="col-span-3"
              ref={inputFileRef}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={async () => await handleSubmit()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

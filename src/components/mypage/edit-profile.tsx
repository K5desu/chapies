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
import { Textarea } from "@/components/ui/textarea";
export function EditProfile(props: {
  name: string;
  message: string;
  useraddress: string;
}) {
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
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              名前
            </Label>
            <Input id="name" defaultValue={props.name} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              コメント
            </Label>
            <Textarea
              id="username"
              defaultValue={props.message}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              連絡先
            </Label>
            <Input
              id="useraccount"
              defaultValue={props.useraddress}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">完了</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

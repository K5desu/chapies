"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div>
      <form className="flex  gap-x-4 ">
        <Input name="question" placeholder="何をしたい？"></Input>
        <Button type="submit">聞く</Button>
      </form>
    </div>
  );
}

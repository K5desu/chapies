import { Mail, User } from "lucide-react";
import { tags } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useArticleStore } from "@/store/article-store";
import { useEffect } from "react";
export function FacilityTag() {
  const [tagname, setTagname] = useState("タグ");
  const { tag, setArticleTag } = useArticleStore();
  useEffect(() => {
    if (tag !== "未入力") {
      setTagname(tag);
    }
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{tag}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {tags.map((tag, index) => (
          <DropdownMenuGroup key={index}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <User className="mr-2 h-4 w-4" />
                <span>{tag.label}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {Object.entries(tag.value).map(([key, value]) => (
                    <DropdownMenuItem
                      onClick={() => {
                        setTagname(value);
                        setArticleTag(value);
                      }}
                      key={key}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      <span>{value}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

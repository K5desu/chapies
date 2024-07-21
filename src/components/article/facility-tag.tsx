import { Mail, User } from "lucide-react";
import { tags } from "@/lib/data";

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

export function FacilityTag() {
  const { tag, setArticleTag } = useArticleStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{tag == "" ? "タグ" : tag}</Button>
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

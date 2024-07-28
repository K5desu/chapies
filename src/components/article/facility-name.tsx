"use client";

import { use, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { facilityName } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useArticleStore } from "@/store/article-store";
export function FacilityName() {
  const [open, setOpen] = useState(false);

  const { setArticleTitle, title } = useArticleStore();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
         
        >
          {title == ""
            ? "施設名"
            : facilityName.find((framework) => framework.value === title)
                ?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" >
        <Command>
          <CommandInput placeholder="施設名を入力してください" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {facilityName.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setArticleTitle(currentValue === title ? "" : currentValue);

                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    title === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

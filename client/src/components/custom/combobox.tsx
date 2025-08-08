"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Spinner from "../ui/spinner";
import { DynamicFormSheet } from "./dynamic-form-sheet";

export function Combobox({
  value,
  onChange,
  frameworks,
  isLoading,
  labelName,
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-[40px] justify-between"
          >
            {value
              ? frameworks?.find((framework) => framework.name === value)?.name
              : `Select ${labelName}`}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0 overflow-y-auto"
          align="start"
          sideOffset={4}
        >
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {isLoading ? (
                  <Spinner />
                ) : (
                  frameworks?.map((framework) => (
                    <CommandItem
                      key={framework.documentId}
                      value={framework.name}
                      onSelect={(currentValue) => {
                        onChange(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      {framework.name}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === framework.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                )}
              </CommandGroup>

              {/* Add the Sheet Here */}
              {/* <DynamicFormSheet labelName={labelName} /> */}
            </CommandList>
          </Command>
          {/* Add the Sheet Here */}
          <DynamicFormSheet labelName={labelName} />
        </PopoverContent>
      </div>
    </Popover>
  );
}

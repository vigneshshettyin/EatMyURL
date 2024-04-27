import { DatePickerWithRange } from "@/components/DialogComponents/DatePickerWithRange";
import React from "react";
import { FilterDialog } from "@/components/DialogComponents/FilterDialog";
import { LinkCard } from "@/components/CardComponents/LinkCard";
import { LinkCardProps } from "@/interfaces/ui";

const data : LinkCardProps[] = [
  {
    id: 1,
    title: "Rick Rolling",
    shortLink: "eurl.dev/hello",
    longLink: "https://google.com",
  },
  {
    id: 2,
    title: "Blah Rolling",
    shortLink: "eurl.dev/blaha",
    longLink: "https://goo.com",
  },
  {
    id: 3,
    title: "cutew Rolling",
    shortLink: "eurl.dev/cuteww",
    longLink: "https://goocut.com",
  },
];

export default function Page() {
  return (
    <div className="pt-10 pl-6 w-full pr-2">
      <h1 className="font-bold text-3xl ml-3">Links</h1>
      <div className="flex mt-6 md:flex-row flex-col">
        <div className="ml-2">
          <DatePickerWithRange />
        </div>
        <div className="mt-3 md:mt-0 ml-0 md:ml-4">
          <FilterDialog />
        </div>
      </div>

      {data.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}

import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";
import React from "react";
import { FilterDialog } from "@/components/ui/FilterDialog";
import { LinkCard } from "@/components/ui/LinkCard";

const data = [{
  title : "Rick Rolling",
  shortLink : "eurl.dev/hello",
  longLink : "https://google.com"
},{
  title : "Blah Rolling",
  shortLink : "eurl.dev/blaha",
  longLink : "https://goo.com"
},
{
  title : "cutew Rolling",
  shortLink : "eurl.dev/cuteww",
  longLink : "https://goocut.com"
}]

export default function Page() {
  return (
    <div className="pt-10 pl-6 w-full pr-4">
      <h1 className="font-bold text-3xl ml-1">Links</h1>
      <div className="flex mt-3 md:flex-row flex-col">
        <DatePickerWithRange />
        <div className="mt-3 md:mt-0 md:ml-4">
          <FilterDialog/>
        </div>  
      </div>
      
      {data.map((link)=><LinkCard link={link}/>)}
      
    </div>
  );
}

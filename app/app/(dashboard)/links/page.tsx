"use client"

import { DatePickerWithRange } from "@/components/DialogComponents/DatePickerWithRange";
import React, { useEffect, useState } from 'react'
import { FilterDialog } from "@/components/DialogComponents/FilterDialog";
import { LinkCard } from "@/components/CardComponents/LinkCard";

import { getLinks } from "@/lib/actions/getLinksAction";
import { DateRange } from "react-day-picker";
import Loading from "./loading";
import { linkType } from "@/interfaces/types";



export default function Page() {

  const [filteredLinks,setFilteredLinks] = useState<linkType[] | undefined>([])
  const [loading,setLoading] = useState<Boolean>(true)
  const current_date = new Date()
  const [date, setDate] = React.useState<DateRange | undefined>({
      to: new Date(current_date.getFullYear(), current_date.getMonth(), current_date.getDate()+1),
      from: new Date(2024, 4, 18),
  })

  useEffect(()=>{
      setLoading(true)
      getLinks().then((res)=>{
          const linkList:linkType[] | undefined = res.links;
          const from: Date | undefined = date?.from;
          const to: Date | undefined = date?.to;
          const filterLinks: linkType[] | undefined = linkList?.filter((link)=>{
              return (!from || link.created_at >=from) && (!to || link.created_at <= to)
          })
          setFilteredLinks(filterLinks)
          setLoading(false)
      })

  },[date])
  
  return (
    <div className="pt-10 md:pl-6 pl-2 w-full pr-2">
      <h1 className="font-bold text-3xl ml-3">Links</h1>
      <div className="flex mt-6 md:flex-row flex-col">
        <div className="ml-2">
          <DatePickerWithRange date={date} setDate={setDate} current_date={current_date}/>
        </div>
        <div className="mt-3 md:mt-0 ml-0 md:ml-4">
          <FilterDialog />
        </div>
      </div>

      {loading?<Loading/>:<div>{filteredLinks?.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}</div>}

    </div>
  );
}

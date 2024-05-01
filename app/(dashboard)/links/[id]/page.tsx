"use client";

import { ArrowLeft, ArrowUpDownIcon, Calendar, Copy, LinkIcon, Pencil, Share2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { PieChart } from "@/components/GraphicalComponents/PieChart";
import Link from 'next/link'
import { Button } from "@/components/ui/button";
import { LinkShareDialog } from "@/components/DialogComponents/LinkShareDialog";
import { EditLinkDialog } from "@/components/DialogComponents/EditLinkDialog";
import { copyToClipboard } from "@/lib/utils";
import { LinkType } from "@/interfaces/types";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Page(params : any) {
  const id = params.id; // id to make request to the server

  const link: LinkType = {
    id: 1,
    title: "Tech Trends Webinar",
    shortLink: "tech-trends-webinar",
    longLink: "https://example.com/tech-trends-webinar",
    engagement: 1200,
    dateCreated: new Date(),
    last7DaysEngage: 900,
    weeklyChange: -25,
    locations: [
      { id: 1, country: "United States", engagements: 600, percentage: 50 },
      { id: 2, country: "United Kingdom", engagements: 300, percentage: 25 },
      { id: 3, country: "Canada", engagements: 180, percentage: 15 },
      { id: 4, country: "Australia", engagements: 120, percentage: 10 }
    ],
    devices: {
      Desktop: 720,
      Mobile: 420,
      Tablet: 60
    }
  };

  return (
    <div className="pl-5 md:pl-8 pr-2">
      <Link href="/links">
      <div
        className="flex cursor-pointer w-fit"
      >
        <ArrowLeft size={20} />
        <h1 className="ml-2 text-sm font-medium">Back to list</h1>
      </div>
      </Link>



      <div className="flex mt-6 py-6 pr-4 flex-col rounded-xl border-[0.5px] shadow-md">
    <div className="flex">
      <div className="flex flex-col ml-6 w-full">
        <div className="flex justify-between ">
          <h1 className="text-xl font-bold">
            {link.title}
          </h1>
          <div className="hidden md:block">
            <Button onClick={()=>{copyToClipboard(link.shortLink)}} variant="outline">
              <Copy size={15} className="mr-2" />
              Copy
            </Button>
            <LinkShareDialog link={link}>
            <Button variant="outline" className="ml-2">
              <Share2 size={15} className="mr-2" />
              Share
            </Button>
            </LinkShareDialog>
            <EditLinkDialog link={{title:link.title,shortLink:link.shortLink}}>
              <Button variant="outline" className="ml-2">
                <Pencil size={15} className="mr-2" />
                Edit
              </Button>
            </EditLinkDialog>
          </div>
        </div>
        <div className="flex">
            <div className="h-8 w-8 md:h-12 md:w-12 border-[0.5px] shadow-md rounded-full flex justify-center items-center">
            <LinkIcon className="h-4 w-4 md:h-6 md:w-6" />
            </div>
            <div className="ml-4">
                <h1 className="text-blue-400 mt-1 hover:underline cursor-pointer w-fit">
                <a href={"https://"+link.shortLink}>{link.shortLink}</a>
                </h1>
                <h1 className="mt-2 text-sm hover:underline cursor-pointer w-fit">
                <a href={link.longLink}>{link.longLink}</a>
                </h1>
            </div>
        </div>
        
        <div className="flex mt-6 md:flex-row flex-col">
          <div className="flex mt-2 md:mt-0">
            <Calendar className="ml-0 md:ml-4 " size={20} />
            <h1 className="text-sm ml-2">{months[link.dateCreated.getMonth()]} {link.dateCreated.getDate()} {link.dateCreated.getFullYear()}</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8 ml-8 md:hidden">
        <Button onClick={()=>{copyToClipboard(link.shortLink)}} variant="outline">
          <Copy size={15} />
        </Button>
        <LinkShareDialog link={link}>
        <Button variant="outline" className="ml-2">
          <Share2 size={15} />
        </Button>
        </LinkShareDialog>
        <EditLinkDialog link={{title:link.title,shortLink:link.shortLink}}>
        <Button className="ml-2 " variant="outline">
          <Pencil size={15}/>
        </Button>
        </EditLinkDialog>
      </div>
    </div>





      <div className="flex md:flex-row flex-col mt-6 mr-0">
        <div className="flex-1 flex justify-between shadow-md p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Engagements</h1>
          <h1 className="text-2xl font-bold">{link.engagement}</h1>
        </div>
        <div className="flex-1 flex justify-between shadow-md ml-0 md:mt-0 mt-4 md:ml-4 p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Last 7 days</h1>
          <h1 className="text-2xl font-bold">{link.last7DaysEngage}</h1>
        </div>
        <div className="flex-1 flex justify-between shadow-md ml-0 md:mt-0 mt-4 md:ml-4 p-4 rounded-xl items-center border-[0.5px]">
          <h1 className="text-md">Weekly change</h1>
          <div className="flex items-center">
            <ArrowUpDownIcon size={25} />
            <h1 className="text-2xl font-bold ml-1">{link.weeklyChange}%</h1>
          </div>
        </div>
      </div>
      <div className="mt-6 border-[0.5px] rounded-xl px-3 py-4 shadow-md">
        <Label className="font-bold ml-2">Locations</Label>
        <Table className="mt-4">

          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">#</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Engagements</TableHead>
              <TableHead className="text-right">%</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {link.locations?.map((location)=>{
                return <TableRow key={location.id}>
                <TableCell className="font-medium">{location.id}</TableCell>
                <TableCell>{location.country}</TableCell>
                <TableCell className="text-right">{location.engagements}</TableCell>
                <TableCell className="text-right">{location.percentage}%</TableCell>
              </TableRow>
            })}

          </TableBody>
        </Table>

      </div>
      <div className="flex justify-center md:justify-start">
      <div className="mt-8 shadow-md p-6 rounded-xl w-fit border-[0.5px]">
        <Label className="font-bold ml-3 text-lg">Devices</Label>
        <div className="mt-4 md:w-[300px] md:h-[300px] w-[250px] h-[250px]">

          <PieChart devices={Object.keys(link.devices ?? {})} data={Object.values(link.devices ?? {})}/>

        </div>
      </div>
      </div>
    </div>
  );
}

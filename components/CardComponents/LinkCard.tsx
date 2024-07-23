"use client";
import {
  BarChart2,
  Calendar,
  Copy,
  LinkIcon,
  Pencil,
  Share2,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "../ui/button";
import { EditLinkDialog } from "../DialogComponents/EditLinkDialog";
import { copyToClipboard } from "@/lib/utils";
import { LinkShareDialog } from "../DialogComponents/LinkShareDialog";
import { linkType } from "@/interfaces/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import encodeId from "@/lib/services/encodeId";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function LinkCard({
  link,
}: {
  link: linkType;
}) {
  const REDIRECT_URL:string = process.env.REDIRECT_URL || "https://eurl.dev";
  const [shortCode,setShortcode] = useState<string>(link.short_code); 
  const shortLink:string = `${REDIRECT_URL}/${shortCode}`
  const [title,setTitle] = useState<string | null>(link.title)
  const router = useRouter();

  return (
    <div className="flex mt-6 p-6 flex-col rounded-xl border-[0.5px] shadow-md">
      <div className="flex">
        <div className="h-8 w-8 lg:h-12 lg:w-12 border-[0.5px] shadow-md rounded-full flex justify-center items-center">
          <LinkIcon className="h-4 w-4 lg:h-6 lg:w-6" />
        </div>
        <div className="flex flex-col ml-6 w-full">
          <div className="flex justify-between">
            <h1 onClick={()=>router.push(`/app/links/${encodeId(link.id)}`)} className="text-lg lg:w-[53%] w-full break-all font-bold hover:underline cursor-pointer">
              {title}
            </h1>
            <div className="hidden lg:block">
              <Button onClick={()=>{copyToClipboard(shortLink)}} variant="outline">
                <Copy size={15} className="mr-2" />
                Copy
              </Button>
              <LinkShareDialog shortCode={shortCode} link={link}>
                <Button variant="outline" className="ml-2">
                  <Share2 size={15} className="mr-2" />
                  Share
                </Button>
              </LinkShareDialog>
              <EditLinkDialog setShortcode={setShortcode} setParentTitle={setTitle} link={link}>
                <Button variant="outline" className="ml-3">
                  <Pencil size={15} className="mr-2" />
                  Edit
                </Button>
              </EditLinkDialog>
            </div>
          </div>

          <h1 onClick={()=>{
            window.open(
              shortLink,
              "_blank"
            )
          }} className="text-blue-400 mt-1 hover:underline cursor-pointer w-fit">
            {shortLink}
          </h1>
          <h1 onClick={()=>{
            window.open(
              link.long_url,
              "_blank"
            )
          }} className="mt-2 text-sm hover:underline cursor-pointer">
            {link.long_url.length >= 10?<>{link.long_url.slice(0,30)}.....</>:<>{link.long_url}</>}
          </h1>

          <div className="flex mt-6 lg:flex-row flex-col">
            <div className="flex">
              <BarChart2 size={20} />
              <h1 className="text-sm ml-2 hover:underline cursor-pointer">
                {link.engagements}{" "}
                <HoverCard>
                  <HoverCardTrigger>engagement</HoverCardTrigger>
                  <HoverCardContent>
                    Includes short link clicks, QR Code scans
                  </HoverCardContent>
                </HoverCard>
              </h1>
            </div>
            <div className="flex mt-2 lg:mt-0">
              <Calendar className="ml-0 lg:ml-4 " size={20} />
              <h1 className="text-sm ml-2">{months[link.created_at.getMonth()]} {link.created_at.getDate()},{link.created_at.getFullYear()}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 ml-8 lg:hidden">
        <Button onClick={()=>{copyToClipboard(shortLink)}} variant="outline">
          <Copy size={15} />
        </Button>
        <LinkShareDialog shortCode={shortCode} link={link}>
          <Button variant="outline" className="ml-2">
            <Share2 size={15} />
          </Button>
        </LinkShareDialog>
        <EditLinkDialog setShortcode={setShortcode} setParentTitle={setTitle} link={link}>
          <Button className="ml-2" variant="outline">
            <Pencil size={15} />
          </Button>
        </EditLinkDialog>
      </div>
    </div>
  );
}

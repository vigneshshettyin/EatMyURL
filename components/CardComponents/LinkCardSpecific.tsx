"use client"

import { Calendar, Copy, LinkIcon, Pencil, Share2 } from "lucide-react";
import { LinkShareDialog } from "../DialogComponents/LinkShareDialog";
import { Button } from "../ui/button";
import { EditLinkDialog } from "../DialogComponents/EditLinkDialog";
import { toast } from "../ui/use-toast";

export function LinkCardSpecific({
    link,
  }: {
    link: {
      title: string;
      shortLink: string;
      longLink: string;
    };
  }){

    function copyToClipboard(){
        navigator.clipboard.writeText(link.shortLink);
        toast({
          title: "Copied the link to clipboard !!",
        });
      }

    return <div className="flex mt-6 py-6 pr-4 flex-col rounded-xl border-[0.5px] shadow-md">
    <div className="flex">
      <div className="flex flex-col ml-6 w-full">
        <div className="flex justify-between ">
          <h1 className="text-xl font-bold">
            {link.title}
          </h1>
          <div className="hidden md:block">
            <Button onClick={copyToClipboard} variant="outline">
              <Copy size={15} className="mr-2" />
              Copy
            </Button>
            <LinkShareDialog link={link}>
            <Button variant="outline" className="ml-2">
              <Share2 size={15} className="mr-2" />
              Share
            </Button>
            </LinkShareDialog>
            <EditLinkDialog>
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
            <h1 className="text-sm ml-2">April 21 2024</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-8 ml-8 md:hidden">
        <Button onClick={copyToClipboard} variant="outline">
          <Copy size={15} />
        </Button>
        <LinkShareDialog link={link}>
        <Button variant="outline" className="ml-2">
          <Share2 size={15} />
        </Button>
        </LinkShareDialog>
        <EditLinkDialog>
        <Button className="ml-2 " variant="outline">
          <Pencil size={15}/>
        </Button>
        </EditLinkDialog>
      </div>
    </div>
}
import { BarChart2, Calendar, Copy, LinkIcon, Share2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./button";

export function LinkCard({
  link,
}: {
  link: {
    title: string;
    shortLink: string;
    longLink: string;
  };
}) {
  return (
    <div className="flex mt-6 p-6 flex-col rounded-xl border-[0.5px] shadow-md">
    <div className="flex">
      <div className="h-8 w-8 md:h-12 md:w-12 border-[0.5px] shadow-md rounded-full flex justify-center items-center">
        <LinkIcon className="h-4 w-4 md:h-6 md:w-6" />
      </div>
      <div className="flex flex-col ml-6 w-full">
        <div className="flex justify-between ">
          <h1 className="text-lg font-bold hover:underline cursor-pointer">
            {link.title}
          </h1>
          <div className="hidden md:block">
            <Button variant="outline">
              <Copy size={15} className="mr-2" />
              Copy
            </Button>
            <Button variant="outline" className="ml-2">
              <Share2 size={15} className="mr-2" />
              Share
            </Button>
          </div>
        </div>

        <h1 className="text-blue-400 mt-1 hover:underline cursor-pointer w-fit">
          {link.shortLink}
        </h1>
        <h1 className="mt-2 text-sm hover:underline cursor-pointer w-fit">
          {link.longLink}
        </h1>

        <div className="flex mt-6 md:flex-row flex-col">
          <div className="flex">
            <BarChart2 size={20} />
            <h1 className="text-sm ml-2 hover:underline cursor-pointer">
              1{" "}
              <HoverCard>
                <HoverCardTrigger>engagement</HoverCardTrigger>
                <HoverCardContent>
                  Includes short link clicks, QR Code scans
                </HoverCardContent>
              </HoverCard>
            </h1>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Calendar className="ml-0 md:ml-4 " size={20} />
            <h1 className="text-sm ml-2">April 21,2024</h1>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-6 ml-4 md:hidden">
        <Button variant="outline">
          <Copy size={15} className="mr-2" />
          Copy
        </Button>
        <Button variant="outline" className="ml-2">
          <Share2 size={15} className="mr-2" />
          Share
        </Button>
      </div>
    </div>
  );
}

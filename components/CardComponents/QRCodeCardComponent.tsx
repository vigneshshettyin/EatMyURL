import { Label } from "@radix-ui/react-label";
import { BarChart2, Calendar, CornerDownRightIcon, Download, Link, Pencil } from "lucide-react";
import { DownloadQRDropDown } from "../DropdownComponents/DownloadQRDropDown";
import { Button } from "../ui/button";

export function QRCodeCardComponent() {
  return (
    <div className="flex md:flex-row flex-col mt-6 p-6 rounded-xl border-[0.5px] shadow-md">
      <div className="flex justify-center md:justify-start">
        <img
          className="w-36 h-32 border-2 rounded-xl"
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
          alt=""
        />
      </div>
      <div className="flex flex-col ml-6 md:mt-0 mt-4 w-full">
        <div className="flex justify-between pr-8">
          <Label className="text-2xl font-bold cursor-pointer hover:underline">CP Algorithm</Label>
          <div className="hidden md:flex">
            <DownloadQRDropDown><Button variant='outline'><Download size={20}/></Button></DownloadQRDropDown>
            <Button variant='outline' className="ml-4"><Pencil size={20}/></Button>
          </div>
        </div>
        <Label className="font-medium mt-2">Website</Label>
        <div className="flex mt-2 items-center">
          <CornerDownRightIcon size="16" />
          <Label className="hover:underline ml-2 text-sm cursor-pointer">
            http://google.com
          </Label>
        </div>
        <div className="flex mt-6 md:flex-row flex-col">
          <div className="flex">
            <BarChart2 size={20} />
            <h1 className="text-sm ml-2 hover:underline cursor-pointer">
              1 scans
            </h1>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Calendar className="ml-0 md:ml-4 " size={20} />
            <h1 className="text-sm ml-2">April 21,2024</h1>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Link className="ml-0 md:ml-4 " size={20} />
            <h1 className="text-sm ml-2 hover:underline cursor-pointer">eurl.dev/new</h1>
          </div>
        </div>
        <div className="flex md:hidden mt-6 justify-end pr-12">
            <DownloadQRDropDown><Button variant='outline'><Download size={20}/></Button></DownloadQRDropDown>
            <Button variant='outline' className="ml-4"><Pencil size={20}/></Button>
          </div>
      </div>
    </div>
  );
}

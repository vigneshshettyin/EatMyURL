"use client"

import { BarChart2Icon, HomeIcon, LinkIcon, Plus, QrCodeIcon, Settings } from "lucide-react";
import { Button } from "./button";
import { Label } from "@radix-ui/react-label";
import { CreateNewDropDown } from "./CreateNewDropDown";


export function SideNavBar (){
    return <div className="px-2 md:px-4 border-r-2 h-screen fixed left-0">
    <CreateNewDropDown><Button className="hidden md:block mt-12">Create New</Button></CreateNewDropDown>
    <Button size="icon" className="md:hidden mt-12">
      <CreateNewDropDown><Plus /></CreateNewDropDown>
    </Button>
    {/* this is a seperator */}
    <div className="border-t-2 my-4"></div>
    <div className="flex flex-col items-center md:items-start">
      <div className="flex mt-3 cursor-pointer">
        <HomeIcon />
        <Label className="hidden md:block ml-1 cursor-pointer">Home</Label>
      </div>
      <div className="flex mt-8 cursor-pointer">
        <LinkIcon />
        <Label className="ml-1 hidden md:block cursor-pointer">Links</Label>
      </div>
      <div className="flex mt-8 cursor-pointer">
        <QrCodeIcon />
        <Label className="ml-1 hidden md:block cursor-pointer">
          QR Codes
        </Label>
      </div>
      <div className="flex mt-8 cursor-pointer">
        <BarChart2Icon />
        <Label className="ml-1 hidden md:block cursor-pointer">
          Analytics
        </Label>
      </div>
    </div>
    <div className="border-t-2 my-6"></div>
    <div className="flex mt-4 justify-center md:justify-start cursor-pointer">
      <Settings />
      <Label className="ml-1 cursor-pointer hidden md:block ">
        Settings
      </Label>
    </div>
  </div>
}
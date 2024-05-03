"use client"
import { BarChart2Icon, HomeIcon, LinkIcon, Plus, QrCodeIcon, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { CreateNewDropDown } from "../DropdownComponents/CreateNewDropDown";
import Link from 'next/link';


export function SideNavBar (){

    return <div className="md:px-4 md:border-r-2 border-0 h-screen md:fixed static md:left-0">
    <div className="flex justify-center">
    <CreateNewDropDown><Button className="mt-12">Create New</Button></CreateNewDropDown>
    </div>
    {/* this is a seperator */}
    <div className="border-t-2 my-4"></div>
    <div className="flex flex-col items-center md:items-start">

      <Link href="/home">
      <div className="flex mt-3 cursor-pointer">
        <HomeIcon />
        <Label className="ml-1 cursor-pointer">Home</Label>
      </div>
      </Link>

      <Link href="/links">
      <div className="flex mt-8 cursor-pointer">
        <LinkIcon />
        <Label className="ml-1 cursor-pointer">Links</Label>
      </div>
      </Link>

      <Link href="/qrcodes">
      <div className="flex mt-8 cursor-pointer">
        <QrCodeIcon />
        <Label className="ml-1 cursor-pointer">
          QR Codes
        </Label>
      </div>
      </Link>


      <div className="flex mt-8 cursor-pointer">
        <BarChart2Icon />
        <Label className="ml-1 cursor-pointer">
          Analytics
        </Label>
      </div>
    </div>
    <div className="border-t-2 my-6"></div>
    <div className="flex mt-4 justify-center md:justify-start cursor-pointer">
      <Settings />
      <Label className="ml-1 cursor-pointer">
        Settings
      </Label>
    </div>
  </div>
}
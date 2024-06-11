"use client";
import { Label } from "@radix-ui/react-label";
import {
  BarChart2,
  Calendar,
  CornerDownRightIcon,
  Download,
  LinkIcon,
  Pencil,
} from "lucide-react";

import { Button } from "../ui/button";
import { QRCodeType } from "@/interfaces/types";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";
import { nanoid } from "nanoid";
import { DownloadQRDropDown } from "../DropdownComponents/DownloadQRDropDown";
import { useRouter } from "next/navigation";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function QRCodeCardComponent({ qrcode }: { qrcode: any }) {
  const qrCodeRef = useRef(null);
  const REDIRECT_URL = process.env.REDIRECT_URL || "https://eurl.dev";
  const shortLink = `${REDIRECT_URL}/${qrcode.short_code}`;
  const router = useRouter();

  function downloadQRCode(format:string) {
    const canvas = (qrCodeRef.current as any).firstElementChild;
    const pngUrl = (canvas as any)
      .toDataURL("image/"+format)
      .replace("image/"+format, "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${nanoid(5)}.${format}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="flex md:flex-row flex-col mt-8 p-6 rounded-xl border-[0.5px] shadow-md">
      <div className="flex justify-center md:justify-start">
        <div className="p-4 bg-white rounded-2xl">
          <div ref={qrCodeRef}>
            <QRCodeCanvas value={shortLink} size={140} />
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-6 md:mt-0 mt-4 w-full">
        <div className="flex justify-between pr-8">
          <Label onClick={()=>router.push(`/app/links/${qrcode.id}`)} className="text-2xl md:w-[90%] w-full break-all font-bold cursor-pointer hover:underline">
            {qrcode.title}
          </Label>
          <div className="hidden md:flex">
          <DownloadQRDropDown downloadQRCode={downloadQRCode}>
            <Button variant="outline">
              <Download size={20} />
            </Button>
          </DownloadQRDropDown>
          </div>
        </div>
        <Label className="font-medium mt-2">Website</Label>
        <div className="flex mt-2 items-center">
          <CornerDownRightIcon size="16" />
          <Label onClick={()=>{
            window.open(
              qrcode.long_url,
              "_blank"
            )
          }} className="hover:underline ml-2 text-sm cursor-pointer">
            {qrcode.long_url.length >= 10?<>{qrcode.long_url.slice(0,30)}.....</>:<>{qrcode.long_url}</>}
          </Label>
        </div>
        <div className="flex mt-6 md:flex-row flex-col">
          <div className="flex">
            <Calendar size={20} />
            <h1 className="text-sm ml-2">
              {months[qrcode.created_at.getMonth()]}{" "}
              {qrcode.created_at.getDate()},{qrcode.created_at.getFullYear()}
            </h1>
          </div>
          <div className="flex mt-2 md:mt-0">
            <LinkIcon className="ml-0 md:ml-4 " size={20} />
            <h1 onClick={()=>{
            window.open(
              shortLink,
              "_blank"
            )
          }} className="text-sm ml-2 hover:underline cursor-pointer">
              {shortLink}
            </h1>
          </div>
        </div>
        <div className="flex md:hidden mt-6 justify-end pr-12">
          <DownloadQRDropDown downloadQRCode={downloadQRCode}>
          <Button variant="outline">
            <Download size={20} />
          </Button>
          </DownloadQRDropDown>
        </div>
      </div>
    </div>
  );
}

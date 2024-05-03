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

export function QRCodeCardComponent({ qrcode }: { qrcode: QRCodeType }) {
  const qrCodeRef = useRef(null);

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
    <div className="flex md:flex-row flex-col mt-6 p-6 rounded-xl border-[0.5px] shadow-md">
      <div className="flex justify-center md:justify-start">
        <div className="p-4 bg-white rounded-2xl">
          <div ref={qrCodeRef}>
            <QRCodeCanvas value="https://reactjs.org/" size={140} />
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-6 md:mt-0 mt-4 w-full">
        <div className="flex justify-between pr-8">
          <Label className="text-2xl font-bold cursor-pointer hover:underline">
            {qrcode.title}
          </Label>
          <div className="hidden md:flex">
          <DownloadQRDropDown downloadQRCode={downloadQRCode}>
            <Button variant="outline">
              <Download size={20} />
            </Button>
          </DownloadQRDropDown>
            <Button variant="outline" className="ml-4">
              <Pencil size={20} />
            </Button>
          </div>
        </div>
        <Label className="font-medium mt-2">Website</Label>
        <div className="flex mt-2 items-center">
          <CornerDownRightIcon size="16" />
          <Label className="hover:underline ml-2 text-sm cursor-pointer">
            {qrcode.longLink}
          </Label>
        </div>
        <div className="flex mt-6 md:flex-row flex-col">
          <div className="flex">
            <BarChart2 size={20} />
            <h1 className="text-sm ml-2 hover:underline cursor-pointer">
              {qrcode.scans} scans
            </h1>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Calendar className="ml-0 md:ml-4 " size={20} />
            <h1 className="text-sm ml-2">
              {months[qrcode.dateCreated.getMonth()]}{" "}
              {qrcode.dateCreated.getDate()},{qrcode.dateCreated.getFullYear()}
            </h1>
          </div>
          <div className="flex mt-2 md:mt-0">
            <LinkIcon className="ml-0 md:ml-4 " size={20} />
            <h1 className="text-sm ml-2 hover:underline cursor-pointer">
              {qrcode.shortLink}
            </h1>
          </div>
        </div>
        <div className="flex md:hidden mt-6 justify-end pr-12">
          <DownloadQRDropDown downloadQRCode={downloadQRCode}>
          <Button variant="outline">
            <Download size={20} />
          </Button>
          </DownloadQRDropDown>
          <Button variant="outline" className="ml-4">
            <Pencil size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { QrCodeIcon } from "lucide-react";
import {QRCodeCanvas} from 'qrcode.react';
import { useRef } from "react";
import { nanoid } from "nanoid";

export function QrPopup({shortUrl}:{
  shortUrl : string
}) {

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
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <QrCodeIcon className="ml-2 h-4 w-4 cursor-pointer hover:scale-110" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Get redirected to the current link by scanning the qr code
          </DialogDescription>
          <div className="flex justify-center rounded-xl">
            <div ref={qrCodeRef} className="bg-white p-4 rounded-xl">
          <QRCodeCanvas value={"eurl.vshetty.dev/"+shortUrl}size={250} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={()=>downloadQRCode('png')} type="button" variant="secondary">
                Download
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import QRCode from "react-qr-code";

export function QrPopup() {
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
          <div className="flex justify-center">
            <QRCode value="https://app.eurl.vshetty.dev" size={250} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Done
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
